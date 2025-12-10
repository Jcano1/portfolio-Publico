<?php

namespace App\Helpers;

class PageSanitizer
{
    // Tipos permitidos (amplía según tu proyecto)
    protected static $allowedTypes = [
        'container',
        'text',
        'button',
        'image',
        'link',
        // etc.
    ];

    // Propiedades CSS permitidas — para inlineStyle
    protected static $allowedCssProperties = [
        'display','width','height','background-color','background','color','font-size',
        'padding','padding-top','padding-bottom','padding-left','padding-right',
        'margin','margin-top','margin-bottom','margin-left','margin-right',
        'border-radius','text-align','grid-template-columns','gap','column-gap',
        'row-gap','justify-content','align-items','flex-direction','flex','min-width','max-width'
    ];

    // Función principal: recibe array (estructura) y devuelve array saneado
    public static function sanitizeStructure($nodes)
    {
        if (!is_array($nodes)) {
            throw new \Exception("Structure debe ser un array");
        }

        $result = [];
        foreach ($nodes as $node) {
            if (!is_array($node)) continue;
            $type = $node['type'] ?? null;
            if (!$type || !in_array($type, self::$allowedTypes)) {
                // puedes decidir ignorar nodos no permitidos o lanzar excepción
                throw new \Exception("Tipo de nodo no permitido: " . ($type ?? 'null'));
            }

            $props = is_array($node['props'] ?? null) ? $node['props'] : [];

            $cleanProps = [];

            // id (sanitizar)
            if (!empty($props['id'])) {
                $cleanProps['id'] = preg_replace('/[^A-Za-z0-9\-\_]/', '', (string)$props['id']);
            }

            // class (permitir solo caracteres seguros; ojo con Tailwind arbitrario)
            if (!empty($props['class'])) {
                $cleanProps['class'] = self::sanitizeClass((string)$props['class']);
            }

            // inlineStyle -> sanear por propiedad permitida
            if (!empty($props['inlineStyle'])) {
                $cleanProps['inlineStyle'] = self::sanitizeCss((string)$props['inlineStyle']);
            }

            // wrapper (si existe), saneamos su class/inlineStyle de forma similar
            if (!empty($node['wrapper']) && is_array($node['wrapper'])) {
                $wrapper = $node['wrapper'];
                $cleanWrapper = [];
                if (!empty($wrapper['class'])) {
                    $cleanWrapper['class'] = self::sanitizeClass((string)$wrapper['class']);
                }
                if (!empty($wrapper['inlineStyle'])) {
                    $cleanWrapper['inlineStyle'] = self::sanitizeCss((string)$wrapper['inlineStyle']);
                }
                if (!empty($cleanWrapper)) {
                    $cleanProps['wrapper'] = $cleanWrapper;
                }
            }

            // campos específicos por tipo (ej: text -> content)
            if ($type === 'text') {
                $rawContent = $props['content'] ?? '';
                // por defecto quitar etiquetas; si quieres permitir HTML, usa HTMLPurifier
                $cleanProps['content'] = mb_substr(strip_tags((string)$rawContent), 0, 5000);
            }

            if ($type === 'button') {
                $cleanProps['text'] = mb_substr(strip_tags((string)($props['text'] ?? '')), 0, 200);
                // si tienes href u otros atributos, sanealos aquí
            }

            if ($type === 'image') {
                // por ejemplo: solo permitir src con rutas relativas o https
                $src = $props['src'] ?? '';
                if ($src && preg_match('/^(https?:\/\/|\/)/i', $src)) {
                    $cleanProps['src'] = $src;
                    $cleanProps['alt'] = mb_substr(strip_tags((string)($props['alt'] ?? '')), 0, 250);
                } else {
                    // image sin src válido -> ignorarla
                    // continuar sin ella (o lanzar excepción)
                    throw new \Exception("Imagen con src inválido");
                }
            }

            // computed: opcional — normalmente no la utilizamos en render público,
            // puede dejarse o eliminarse. Aquí la ignoramos para evitar inconsistencias.

            // children: recursividad — normalizamos para que siempre haya array
            $childClean = [];
            if (!empty($node['children']) && is_array($node['children'])) {
                $childClean = self::sanitizeStructure($node['children']);
            } else {
                $childClean = [];
            }

            $result[] = [
                'type' => $type,
                'props' => $cleanProps,
                'children' => $childClean,
            ];
        }

        return $result;
    }

    // Sanitiza valor de class: permite letras, números, - _ : / [ ] . # espacios
    public static function sanitizeClass(string $class)
    {
        // elimina etiquetas y caracteres raros
        $class = strip_tags($class);
        // permitir: letras, números, espacios, -, _, :, /, [, ], (, ), ., %
        $class = preg_replace('/[^A-Za-z0-9\s\-\_\:\.\/\[\]\(\)%#]/', '', $class);
        // compactar espacios múltiples
        $class = preg_replace('/\s+/', ' ', trim($class));
        // límite de longitud
        return mb_substr($class, 0, 1000);
    }

    // Sanitiza inline CSS: conserva solo propiedades de la allowlist y filtra valores peligrosos
    public static function sanitizeCss(string $css)
    {
        $css = trim($css);
        if ($css === '') return '';

        $parts = preg_split('/;(?=(?:[^"]*"[^"]*")*[^"]*$)/', $css); // split by ; but careful with quotes
        $out = [];

        foreach ($parts as $part) {
            if (trim($part) === '') continue;
            $kv = explode(':', $part, 2);
            if (count($kv) !== 2) continue;
            $prop = strtolower(trim($kv[0]));
            $val  = trim($kv[1]);

            if (!in_array($prop, self::$allowedCssProperties)) {
                continue;
            }

            // bloquear cosas peligrosas en el valor
            if (preg_match('/(javascript:|expression|url\s*\(|data:)/i', $val)) {
                continue;
            }

            // caracteres permitidos razonables en CSS values
            if (!preg_match('/^[A-Za-z0-9\(\)\s\.,#%:\-\/_\'"rgbafrc\[\]0-9\%\+\*]+$/i', $val)) {
                continue;
            }

            // escapar comillas si hay
            $val = str_replace('"', "'", $val);

            $out[] = $prop . ': ' . $val;
        }

        return implode('; ', $out);
    }
}

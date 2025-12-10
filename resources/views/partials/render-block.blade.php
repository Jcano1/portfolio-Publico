@if ($block['type'] === 'container')
    <div class="{{ $block['props']['class'] ?? '' }}" style="{{ $block['props']['inlineStyle'] ?? '' }}">
        @foreach ($block['children'] ?? [] as $child)
            @include('partials.render-block', ['block' => $child])
        @endforeach
    </div>

@elseif ($block['type'] === 'text')
    <div class="{{ $block['wrapper']['class'] ?? '' }}" >
        <div class="contenido w-full ">
                {!! $block['props']['html'] ?? $block['props']['text'] ?? '' !!}
        </div>
    </div>

@elseif ($block['type'] === 'image')
    <div class="{{ $block['wrapper']['class'] ?? '' }}" >
        <div class="contenido w-full ">
            <img src="{{ $block['props']['src'] ?? '' }}" width="{{ $block['props']['computed']['width'] ?? '' }}"
                class="{{ $block['props']['class'] ?? '' }}" style="{{ $block['props']['inlineStyle'] ?? '' }}"
                data-id="{{ $block['props']['id'] ?? '' }}" alt="{{ $block['props']['alt'] ?? '' }}" />
        </div>
    </div>

@elseif ($block['type'] === 'button')
    <div class="{{ $block['wrapper']['class'] ?? '' }}" >
        <div class="contenido w-full flex justify-center items-center">
            <button style="{{ $block['props']['inlineStyle'] }}" class="{{ $block['props']['inlineClass'] }}" Data-Size="{{$block['props']['dataId']}}" data-id="{{$block['props']['dataId']}}" href="{{$block['props']['href']}}">{{$block['props']['content']}}</button>
        </div>
    </div>

@elseif ($block['type'] === 'Separator')
    <div class="{{ $block['wrapper']['class'] ?? '' }}" >
        <div class="contenido w-full flex justify-center">
            {!!  $block['props']['html'] !!}
        </div>
    </div>
@endif
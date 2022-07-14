<!doctype html>
<html lang="en">


<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="theme-color" content="#000000">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>باشگاه کوهنوردی لاهیجان</title>
    <link rel="icon" type="image/png" href="assets/img/favicon.png" sizes="32x32">
    <link rel="apple-touch-icon" sizes="180x180" href="assets/img/icon/192x192.png">
    <link rel="stylesheet" href={{asset("assets/css/style.css")}}>
    <link rel="stylesheet" href={{asset("assets/css/inc/vazir-font/font-face-30.1.0.css")}}>
    <link rel="manifest" href={{asset("__manifest.json")}}>
    <style>
        body {
            font-family: Vazir, sans-serif !important;
        }
    </style>
</head>

<body class="bg-white" dir='rtl'>

    <div id='app'></div>
    <script src="{{asset('js/app.js')}}"></script>

    <!-- ============== Js Files ==============  -->
    <script src={{asset("assets/js/lib/bootstrap.min.js")}}></script>
    <script type="module" src={{asset("assets/js/ionicons/ionicons.js")}}></script>
    <script src={{asset("assets/js/plugins/splide/splide.min.js")}}></script>
    <script src={{asset("assets/js/plugins/progressbar-js/progressbar.min.js")}}></script>
    <!-- <script src="assets/js/base.js"></script> -->
</body>

</html>
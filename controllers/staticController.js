const faviconSvg = `<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
	<linearGradient id="PIN_GRADIENT" gradientUnits="userSpaceOnUse" x1="15.551" y1="599.4278" x2="34.319" y2="564.1307" gradientTransform="matrix(1 0 0 -1 0 604.22)">
		<stop  offset="0" style="stop-color:#D43C16"/>
		<stop  offset="1" style="stop-color:#B83818"/>
	</linearGradient>
	<path fill="url(#PIN_GRADIENT)" d="M36.9,33.2C40.1,30,42,25.6,42,20.7c0-9.9-8.1-18-18-18s-18,8.1-18,18c0,4.9,1.9,9.3,5.1,12.5c0,0,0,0,0,0.1
		l0.1,0.1c0,0,0.1,0.1,0.1,0.1l11.2,11.2c0.8,0.8,2,0.8,2.8,0l11.2-11.2c0,0,0.1-0.1,0.1-0.1L36.9,33.2
		C36.9,33.3,36.9,33.2,36.9,33.2z"/>
	<path fill="#020203" opacity="0.2" d="M18.5,29.2c-0.6,0-1-0.4-1-1v-12c0-0.6,0.4-1,1-1h2.1c0.6,0,1,0.4,1,1v12c0,0.6-0.4,1-1,1H18.5z"/>
	<path fill="#FFFFFF" d="M20.6,28.7h-2.1c-0.3,0-0.5-0.2-0.5-0.5v-12c0-0.3,0.2-0.5,0.5-0.5h2.1c0.3,0,0.5,0.2,0.5,0.5v12
		C21.1,28.5,20.9,28.7,20.6,28.7z"/>
	<path fill="#020203" opacity="0.04" d="M27.3,14.7h-3.9c-0.7,0-1.2,0.5-1.4,1.1c-0.2-0.6-0.8-1.1-1.4-1.1h-2.1c-0.8,0-1.5,0.7-1.5,1.5v12
		c0,0.8,0.7,1.5,1.5,1.5h2.1c0.7,0,1.2-0.5,1.4-1.1c0.2,0.6,0.8,1.1,1.4,1.1h1.8c0.8,0,1.5-0.7,1.5-1.5v-3h0.3
		c1.7,0,3.2-0.5,4.2-1.5c1.1-1,1.7-2.3,1.7-3.9C33,17.9,32.3,14.7,27.3,14.7z M26.9,21L26.9,21l-0.1-2.1h0.1c1.1,0,1.2,0.4,1.2,1
		C28.1,20.7,27.9,21,26.9,21z"/>
	<path fill="#020203" opacity="0.2" d="M23.5,29.2c-0.6,0-1-0.4-1-1v-12c0-0.6,0.4-1,1-1h3.9c4.3,0,5.2,2.5,5.2,4.6c0,1.4-0.5,2.6-1.5,3.5
		c-1,0.9-2.3,1.3-3.9,1.3h-0.8v3.5c0,0.6-0.4,1-1,1H23.5z M26.9,21.5c1.2,0,1.7-0.5,1.7-1.5c0-0.7-0.2-1.5-1.7-1.5h-0.6v3.1H26.9z"
		/>
	<path fill="#FFFFFF" d="M25.8,24.2v4c0,0.3-0.2,0.5-0.5,0.5h-1.8c-0.3,0-0.5-0.2-0.5-0.5v-12c0-0.3,0.2-0.5,0.5-0.5h3.9
		c3.1,0,4.7,1.4,4.7,4.1c0,1.3-0.4,2.4-1.3,3.2c-0.9,0.8-2.1,1.2-3.6,1.2L25.8,24.2L25.8,24.2z M25.8,17.9V22h1.1
		c1.5,0,2.2-0.7,2.2-2c0-1.3-0.7-2-2.2-2H25.8z"/>
</svg>
`

const indexHtml = `<!DOCTYPE html>
<html>
<head>
    <title>IP Timezones</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="robots" content="none" />
    <link rel="shortcut icon" href="favicon.svg" />
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=Lato:100" rel="stylesheet" type="text/css">
    <style>
        html, body { height: 100%; }
        body { margin: 0; padding: 0; width: 100%; display: table; font-weight: 100; font-family: 'Lato'; }
        .container { text-align: center; display: table-cell; vertical-align: middle; }
        .content { text-align: center; display: inline-block; }
        .title { font-size: 96px; }
    </style>
</head>
<body>
    <div class="container"><div class="content"><div class="title">IP Timezones</div></div></div>
</body>
</html>
`

module.exports = {
    faviconSvg,
    indexHtml,
}

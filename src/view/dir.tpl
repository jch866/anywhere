<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{title}}</title>
    <meta http-equiv="X-UA-Compatible" content="IE=EDGE, chrome=1">
    <meta name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
</head>
<body>
    {{#each files}}
        <a href='{{../dir}}/{{this}}'>{{this}}</a>
    {{/each}}
</body>
</html>
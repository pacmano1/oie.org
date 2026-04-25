// CloudFront Function: rewrite URIs so static site paths resolve to index.html.
//
//   /               -> /index.html
//   /about/         -> /about/index.html
//   /about          -> /about/index.html
//   /assets/app.css -> unchanged (has an extension)
//
// Attach to a CloudFront distribution's default cache behavior
// at the "viewer-request" event type.
function handler(event) {
    var request = event.request;
    var uri = request.uri;

    if (uri.endsWith('/')) {
        request.uri += 'index.html';
    } else if (!uri.includes('.')) {
        request.uri += '/index.html';
    }

    return request;
}

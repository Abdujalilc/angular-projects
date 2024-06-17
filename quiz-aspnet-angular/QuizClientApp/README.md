{
  "/api": {
    "target": "http://localhost:5024"
  }
}

this worked fine

but browser doesn't show the proxied url:
Request URL: http://localhost:4200/api/account/login



in Angular.json:
"serve": {
          "options": {
            "proxyConfig": "src/proxy.conf.json"
          },
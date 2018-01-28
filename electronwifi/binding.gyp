{
    "targets":[
        {
            "target_name":"electronwifi",
            "sources":["electronwifi.cc", "wifi_scan.c"],
            "include_dirs" : [
                "<!(node -e \"require('nan')\")",
                "./"
            ],
            "libraries":["-lmnl"]
        }
    ]
}
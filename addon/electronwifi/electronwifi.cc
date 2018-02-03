#include <nan.h>
#include <wifi_scan.h>

using namespace Nan;
using namespace v8;

NAN_METHOD(scanall){ 
    struct wifi_scan *wifi = wifi_scan_init("wlp1s0");

    Local<Object> retVal = Object::New(info.GetIsolate());
    int status, i;
    struct bss_info bss[10]; 

    status=wifi_scan_all(wifi, bss, 10);
	
    if(status > 0){
        Local<Array> array = New<Array>(status);
        for(i=0;i<status && i<10;++i){
            auto station = New<Object>();
            station->Set(New("name").ToLocalChecked(), New(bss[i].ssid).ToLocalChecked());
            station->Set(New("strength").ToLocalChecked(), New(bss[i].signal_mbm/100));
            station->Set(New("connected").ToLocalChecked(), New(bss[i].status==BSS_ASSOCIATED));
            array->Set(i, station);
        }

        retVal->Set(New("arr").ToLocalChecked(), array);
            // printf("%s signal %d dBm seen %d ms ago status %s\n",
            // bss[i].ssid,  bss[i].signal_mbm/100, bss[i].seen_ms_ago,
            // (bss[i].status==BSS_ASSOCIATED ? "associated" : ""));
    }

	wifi_scan_close(wifi);

    info.GetReturnValue().Set(retVal);;
}

NAN_MODULE_INIT(Init){
    Nan::Set(target, New("scanall").ToLocalChecked(),
        GetFunction(New<FunctionTemplate>(scanall)).ToLocalChecked());
}

NODE_MODULE(electronwifi, Init)

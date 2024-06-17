import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AppSettingsService } from "src/app/settings/settings.service";

@Injectable({ providedIn: "root" })
export class AppAuthService {
    url?: string = "";
    constructor(
        private readonly http: HttpClient,
        private readonly router: Router,
        appSettings: AppSettingsService
    ) {
        this.url = appSettings.data.apiUrl;
    }

    authenticated = () => !!this.token();

    login(data: any): void {
        this.http.post("auths", data).subscribe((result: any) => {
            if (!result || !result.token) {
                return;
            }
            localStorage.setItem("token", result.token);
            this.router.navigate(["/main/home"]);
        });
    }

    signin = () => this.router.navigate(["/login"]);

    signout() {
        localStorage.clear();
        this.signin();
    }

    token = () => localStorage.getItem("token");
}

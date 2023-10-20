const uloge = {
    1: "администратор",
    2: "благајник",
    3: "регистровани корисник",
    4: "блокирани корисник"
}

const pocetniURL = window.location.href;

function sacuvajToken(token, type) {
    localStorage.setItem("token", JSON.stringify({ token, type }));
}

function ucitajToken() {
    return JSON.parse(localStorage.getItem("token"));
}

function ucitajNavbar() {
    const navbar = document.createElement("div");
    navbar.id = "navbar";

    const token = ucitajToken();
    const lokacija = window.location.href.split("/projekt/")[1];
    const prefiks = lokacija.includes("admin/") ? "" : "admin/";
    
    navbar.innerHTML = `
        <nav>
            <ul>
                ${token ? (`
                    ${token.type === uloge[1] ? (`
                        <li><a${lokacija === 'admin/uloge.html' || lokacija.includes('uloga_korisnici') ? ' class="active"' : ''} href="${prefiks}uloge.html">Улоге</a></li>
                        <li><a${lokacija === 'admin/korisnici.html' || lokacija === 'admin/kreiranje_korisnika.html' ? ' class="active"' : ''} href="${prefiks}korisnici.html">Корисници</a></li>
                        <li><a${lokacija === 'admin/lokacije.html' || lokacija === 'admin/kreiranje_lokacije.html' || lokacija.includes('izmena_lokacije') ? ' class="active"' : ''} href="${prefiks}lokacije.html">Локације</a></li>
                    `) : ""}
                    ${token.type !== uloge[4] ? (`
                        <li><a${lokacija === 'dogadjaji.html' ? ' class="active"' : ''} href="${lokacija.includes("admin/") ? "../dogadjaji.html" : "dogadjaji.html"}">Догађаји</a></li>
                        <li><a href="#">Резервације</a></li>
                    `) : ""}
                    <li><a href="${lokacija.includes("admin/") ? "../odjava.html" : "odjava.html"}">Одјава</a></li>  
                `) : (`
                    <li><a${lokacija === 'prijava.html' ? ' class="active"' : ''} href="prijava.html">Пријава</a></li>
                    <li><a${lokacija === 'registracija.html' ? ' class="active"' : ''} href="registracija.html">Регистрација</a></li>
                `)}
            </ul>
            <input
                type="text"
                id="apitoken"
                value="YQ4NWjRNRLWO7jCTSw8wUWrWtUE39Y5O4bVzFItmhQQkmGg1z5w1eWWObW2xhZsqU7KEfWsQ5S1UJmzHWyy9eP1VRG"
                hidden
            >
        </nav>
    `;

    document.body.append(navbar);

    if (token) {
        document.title += ` | ${token.type}`;
    }
}

function ucitajModal(naslov, opis) {
    const modal = document.createElement("div");
    modal.id = "modal";

    modal.innerHTML = `
        <div class="modal">
            <div class="sadrzaj-modala">
                <span id="zatvaracModala" onclick="zatvoriModal()">&times;</span>
                <h2>${naslov}</h2>
                <p>${opis}</p>
            </div>
        </div>
    `;

    document.body.append(modal)
}

function zatvoriModal() {
    const modal = document.getElementById("modal");
    if (modal) {
        document.body.removeChild(modal);
    }
}

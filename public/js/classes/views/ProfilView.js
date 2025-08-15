import { HOST } from "../../host.js";

export class ProfilView {

    render(data) {
        const el = document.getElementById("root");
        if (el) {
            el.innerHTML = ` 
            <div class="profil">
                <div class="profil_top">
                    <div class="profil_top__update box">
                        <div><p><span class="paraGrey">Name: </span>${data.name}</p> <i class="fa-solid fa-pen-to-square profilUpdate-name"></i></div>
                        <div><p><span class="paraGrey">Role: </span>${data.role}</p> <i class="fa-solid fa-pen-to-square profilUpdate-role"></i></div>
                        <div><p><span class="paraGrey">Password: </span>coucou123</p> <i class="fa-solid fa-pen-to-square profilUpdate-password"></i></div>
                        <div><p>BirthDays</p> <div><i class="fa-solid fa-plus profilCreateBirthDays"></i><i class="fa-solid fa-pen-to-square profilUpdate-birthdays"></i></div></div>
                        </div>
                    <div class="profil_top__profil box"> 
             
                        <label for="img-avatar">  
                            <div class="btn profilUpdate-img">Update</div>
                        </label>
                        <input id="img-avatar" type="file"/>
                        <img  class="avatar-preview" src="${HOST}/api/images/avatars/${data.img_url}"/>  
                    </div>
                </div>
                <div class="profil_form"></div>
            </div>
            `;
        }
    }
}
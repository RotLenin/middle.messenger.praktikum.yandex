function e(e){e.classList.add("modal_not_show")}const r=document.querySelector(".profile-img"),o=r.querySelector(".profile-img__img-wrapper"),t=r.querySelector(".modal"),l=t.querySelector(".modal__wrapper");o.addEventListener("click",(()=>{t.classList.remove("modal_not_show")})),t.addEventListener("click",(()=>e(t))),l.addEventListener("click",(e=>e.stopPropagation()));const n=r.querySelector("#profileImg"),i=r.querySelector("label[for=profileImg]"),c=r.querySelector(".profile-img-modal__title"),a=r.querySelector(".accept-btn"),d=r.querySelector(".profile-img-modal__action-error");n.addEventListener("change",(function(){var e,r;return r=i,(""!==(e=n).value?(r.classList.add("custom-file-uploader_done"),r.innerHTML=e.value.split("\\").pop(),0):(r.classList.remove("custom-file-uploader_done"),r.innerHTML="Выберите файл на компьютере",1))?(c.innerHTML="Загрузите файл",!0):(c.innerHTML="Файл загружен",d.innerHTML="",!0)})),a.addEventListener("click",(function(){""!==n.value&&e(t),d.innerHTML="Нужно выбрать файл"}));
//# sourceMappingURL=profile.7be3e25e.js.map
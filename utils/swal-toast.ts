import Swal from "sweetalert2";

export const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    theme: "dark",
    customClass: {
        popup: "!bg-base-200"
    }
    // timer: 3000,
    // timerProgressBar: true,
    // didOpen: (toast) => {
    //     toast.onmouseenter = Swal.stopTimer;
    //     toast.onmouseleave = Swal.resumeTimer;
    // }
});
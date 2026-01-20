function previewLogo(event) {
    const reader = new FileReader();
    reader.onload = function () {
        document.getElementById('logoPreview').src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}

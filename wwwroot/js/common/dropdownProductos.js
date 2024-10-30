function ObtenerProductosDropdown() {
    fetch('https://localhost:7245/Productos')
    .then(response => response.json())
    .then(data => CompletarDropdownProducto(data))
    .catch(error => console.log("No se pudo acceder al servicio.", error));
}

function CompletarDropdownProducto(data){
    let bodySelect = document.getElementById('ProductoId');
    bodySelect.innerHTML = '';

    data.forEach(element => {
        opt = document.createElement("option");
        opt.value = element.id;
        opt.text = element.nombreProducto

        bodySelect.add(opt);
    })
}
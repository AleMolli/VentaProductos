function ObtenerClientesDropdown() 
{
    fetch('https://localhost:7245/Clientes')
    .then(response => response.json())
    .then(data => CompletarDropdown(data))
    .catch(error => console.log("No se pudo acceder al servicio.", error));
}

function CompletarDropdown(data)
{
    let bodySelect = document.getElementById('ClienteId');
    bodySelect.innerHTML = '';
    let bodySelect2 = document.getElementById('ClienteIdEditar');
    bodySelect2.innerHTML = '';

    data.forEach(element => 
    {
        opt = document.createElement("option");
        opt.value = element.id;
        opt.text = element.nombreCliente

        bodySelect.add(opt);
        
        opt2 = document.createElement("option");
        opt2.value = element.id;
        opt2.text = element.nombreCliente

        bodySelect2.add(opt2);
    })
}
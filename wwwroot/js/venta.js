function ObtenerVenta() {
    fetch('https://localhost:7245/Ventas')
    .then(response => response.json())
    .then(data => MostrarVentas(data))
    .catch(error => console.log("No se pudo acceder al servicio.", error));
}

function MostrarVentas(data) {
    let tbody = document.getElementById('todasLasVentas');
    tbody.innerHTML = '';

    data.forEach(element => {
        let tr = tbody.insertRow();

        let td0 = tr.insertCell(0);
        let tdId = document.createTextNode(element.id);
        td0.appendChild(tdId);

        let td1 = tr.insertCell(1);
        let tdFechaVenta = document.createTextNode(Date.ToLocaleString());
        td1.appendChild(tdFechaVenta);

        let td2 = tr.insertCell(2);
        let tdFinalizada = document.createTextNode(element.finalizada);
        td2.appendChild(tdFinalizada);

        let td3 = tr.insertCell(3);
        let tdCliente = document.createTextNode(element.cliente.nombre);
        td3.appendChild(tdCliente);

        let btnEditar = document.createElement('button');
        btnEditar.innerText = 'Modificar';
        btnEditar.setAttribute('class', 'btn btn-info');
        btnEditar.setAttribute('onclick', `BuscarVentaId(${element.id})`);
        let td4 = tr.insertCell(5);
        td4.appendChild(btnEditar);

        let btnEliminar = document.createElement('button');
        btnEliminar.innerText = 'Eliminar';
        btnEliminar.setAttribute('class', 'btn btn-danger');
        btnEliminar.setAttribute('onclick', `EliminarVenta(${element.id})`);
        let td5 = tr.insertCell(6);
        td5.appendChild(btnEliminar);
    });
}
// function MostrarProductos(data) {
//     $("#todosLosProductos").empty();
//     $.each(data, function(index, item) {
//         $('#todosLosProductos').append(
//             "<tr>",
//             "<td>" + item.id + "</td>",
//             "<td>" + item.nombreProducto + "</td>",
//             "<td>" + item.cantidad + "</td>",
//             "<td>" + item.precioVenta + "</td>",
//             "<td>" + item.precioCompra + "</td>",
//             "<td><button class='btn btn-info' onclick='BuscarProductoId(" + item.id + ")'>Modificar</button></td>",
//             "<td><button class='btn btn-danger' onclick='EliminarProducto(" + item.id + ")'>Eliminar</button></td>",
//             "</tr>"
//         )
//     })
// }

function CrearVenta() {
    /*var nCliente = document.getElementById("NombreCliente").value;
    if (nCliente == "" || nCliente == null) {
        return mensajesError('#error', null, "Por favor ingrese un Nombre para el Cliente.");
    }
    var aCliente = document.getElementById("ApellidoCliente").value;
    if (aCliente == "" || aCliente == null) {
        return mensajesError('#error', null, "Por favor ingrese un Apellido para el Cliente.");
    }
    var dniCliente = document.getElementById("DNI").value;
    if (dniCliente == "" || dniCliente == null) {
        return mensajesError('#error', null, "Por favor ingrese un DNI valido para el Cliente.");
    }*/

    let venta = {
        fechaVenta: document.getElementById("FechaVenta").value,
        finalizada: document.getElementById("Finalizada").value,
        clienteId: document.getElementById("ClienteId").value,
    };

    fetch('https://localhost:7245/Ventas',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(venta)
        }
    )
    .then(response => response.json())
    .then(data =>{
        if(data.status == undefined){
            document.getElementById("FechaVenta").value = "";
            document.getElementById("Finalizada").value = "";
            document.getElementById("ClienteId").value = 0;
            $("#error").empty();
            $("#error").attr("hidden", true);

            $('#modalAgregarVentas').modal('hide');
            ObtenerVenta();
        }
        else {
            mensajesError('#error', data);
        }
            
    })
    .catch(error => console.log("Hubo un error al guardar el Cliente nuevo, verifique el mensaje de error: ", error))
}


function EliminarVenta(id) {
    var siElimina = confirm("¿Esta seguro de borrar esta Venta?.")
    if (siElimina == true) {
        EliminarSi(id);
    }
}

function EliminarSi(id) {
    fetch(`https://localhost:7245/Ventas/${id}`,
    {
        method: "DELETE"
    })
    .then(() => {
        ObtenerVenta();
    })
    .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error))
}


function BuscarVentaId(id) {
    fetch(`https://localhost:7245/Ventas/${id}`,{
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("IdVenta").value = data.id;
        document.getElementById("FechaVentaEditar").value = data.fechaVenta;
        document.getElementById("FinalizadaEditar").value = data.finalizada;
        document.getElementById("ClienteIdEditar").value = data.cliente.nombre;

        $('#modalEditarVentas').modal('show');
    })
    .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error));
}


function EditarVenta() {
    /*var nClienteE = document.getElementById("NombreClienteEditar").value;
    if (nClienteE == "" || nClienteE == null) {
        return mensajesError('#error', null, "Por favor ingrese un Nombre para el Cliente.");
    }
    var aClienteE = document.getElementById("ApellidoClienteEditar").value;
    if (aClienteE == "" || aClienteE == null) {
        return mensajesError('#error', null, "Por favor ingrese un Apellido para el Cliente.");
    }
    var dniClienteE = document.getElementById("DNIEditar").value;
    if (dniClienteE == "" || dniClienteE == null) {
        return mensajesError('#error', null, "Por favor ingrese un DNI valido para el Cliente.");
    }*/

    let idVenta = document.getElementById("IdVenta").value;

    let editarVenta = {
        id: idVenta,
        fechaVenta: document.getElementById("FechaVentaEditar").value,
        finalizado: document.getElementById("FinalizadaEditar").value,
        clienteId: document.getElementById("ClienteIdEditar").value,
    }

    fetch(`https://localhost:7245/Ventas/${idVenta}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editarVenta)
    })
    .then(response => response.json())
    .then(data => {
        if(data.status == undefined || data.status == 204){
            document.getElementById("IdVenta").value = 0;
            document.getElementById("FechaVentaEditar").value = "";
            document.getElementById("FinalizadaEditar").value = "";
            document.getElementById("ClienteIdEditar").value = 0;
            $("#errorEditar").empty();
            $("#errorEditar").attr("hidden", true);

            $('#modalEditarVentas').modal('hide');
            ObtenerVenta();
        }
        else{
            mensajesError('#error', data);
        }
    })
    .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error))
}

function mensajesError(id, data, mensaje) {
    $(id).empty();
    if (data != null) {
        $.each(data.errors, function(venta, item) {
            $(id).append(
                "<ol>",
                "<li>" + item + "</li>",
                "</ol>"
            )
        })
    }
    else{
        $(id).append(
            "<ol>",
            "<li>" + mensaje + "</li>",
            "</ol>"
        )
    }
   
    $(id).attr("hidden", false);
}
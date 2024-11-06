function ObtenerVenta() {
    fetch('https://localhost:7245/Ventas')
    .then(result => result.json())
    .then(data => MostrarVentas(data))
    .catch(error => console.log("No se pudo acceder al servicio.", error));
}

function MostrarVentas(data) {
    $("#todasLasVentas").empty();
    
    $.each(data, function(index, item) {
        var date = new Date(item.fechaVenta);
        
        $('#todasLasVentas').append(
            "<tr>",
            "<td>" + item.id + "</td>",
            "<td>" + date.toLocaleString() + "</td>",
            "<td>" + item.finalizada + "</td>",
            "<td>" + item.cliente.nombreCliente + "</td>",
            "<td><button class='btn btn-info' onclick='BuscarVentaId(" + item.id + ")'>Modificar</button></td>",
            "<td><button class='btn btn-danger' onclick='EliminarVenta(" + item.id + ")'>Eliminar</button></td>",
            "<td><button class='btn btn-success' onclick='BuscarProductosDetalle(" + item.id + ")'>Detalle de Venta</button></td>",
            "</tr>"
    )});
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
        finalizada: document.getElementById("Finalizada").checked,
        clienteId: document.getElementById("ClienteId").value,
        cliente: null,
        detalleVenta: null
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
    .then(response => {
        if (!response.ok) {
            return response.json().then(error => {throw new Error(error.message);
            });
        }
        return response.json();
    })
    .then(data =>{
        //if(data.status == undefined){
            document.getElementById("FechaVenta").value = "";
            document.getElementById("Finalizada").checked = false;
            document.getElementById("ClienteId").value = "";
            $("#error").empty();
            $("#error").attr("hidden", true);

            $('#modalAgregarVentas').modal('hide');
            ObtenerVenta();
        }
        //else {
           // mensajesError('#error', data);
        //}
            
    //}
    )
    .catch(error => {
        alert(error.message);})
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
    .then(response => {
        if (!response.ok){return response.json().then(error => {
            throw new Error(error.message)
        })};
        ObtenerVenta();
    })
    .catch(error => {alert(error.message);})
}


function BuscarVentaId(id) {
    fetch(`https://localhost:7245/Ventas/${id}`,{
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("IdVenta").value = data.id;
        document.getElementById("FechaVentaEditar").value = data.fechaVenta;
        document.getElementById("FinalizadaEditar").checked = data.finalizada;
        document.getElementById("ClienteIdEditar").value = data.clienteId;

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
        finalizada: document.getElementById("FinalizadaEditar").checked,
        clienteId: document.getElementById("ClienteIdEditar").value,
        cliente: null,
        detalleVenta: null
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
            document.getElementById("FinalizadaEditar").checked = false;
            document.getElementById("ClienteIdEditar").value = "";
            $("#errorEditar").empty();
            $("#errorEditar").attr("hidden", true);

            $('#modalEditarVentas').modal('hide');
            ObtenerVenta();
        }
        else{
            mensajesError('#errorEditar', data);
        }
    })
    .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error))
}


function BuscarProductosDetalle(id) {
    console.log(id)
    fetch(`https://localhost:7245/DetallesVentas/${id}`,{
        method: "GET"
    })
    .then(response => response.json())
    .then(async data => {
        if (data != null || data != []) {    
            MostrarProductosDetalle(data);
            await ObtenerProductosDropdown();
        }

        document.getElementById("IdVentaDetalle").value = id;
        $('#modalDetalleVenta').modal('show');
    })
    .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error));
}


function MostrarProductosDetalle(data) {
    let tbody = document.getElementById('todoElDetalle');
    tbody.innerHTML = '';

    data.forEach(element => {
        let tr = tbody.insertRow();

        let td0 = tr.insertCell(0);
        let tdProducto = document.createTextNode(element.producto.nombreProducto);
        td0.appendChild(tdProducto);

        let td1 = tr.insertCell(1);
        let tdVenta = document.createTextNode(element.ventaId);
        td1.appendChild(tdVenta);

        let btnEditar = document.createElement('button');
        btnEditar.innerText = 'Modificar';
        btnEditar.setAttribute('class', 'btn btn-info');
        btnEditar.setAttribute('onclick', `BuscarDetalleVenta(${element.id})`);
        let td2 = tr.insertCell(2);
        td2.appendChild(btnEditar);

        let btnEliminar = document.createElement('button');
        btnEliminar.innerText = 'Eliminar';
        btnEliminar.setAttribute('class', 'btn btn-danger');
        btnEliminar.setAttribute('onclick', `EliminarDetalle(${element.id})`);
        let td3 = tr.insertCell(3);
        td3.appendChild(btnEliminar);
    })
}


function GuardarDetalleVenta() {
    let idVentaDetalle = document.getElementById("IdVentaDetalle").value;

    let guardarDetalle = {
        productoId: document.getElementById("ProductoId").value,
        ventaId: idVentaDetalle,
    }

    fetch('https://localhost:7245/DetallesVentas',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(guardarDetalle)
        }
    )
    .then(response => response.json())
    .then(() => {
            document.getElementById("ProductoId").value = 0;

            $("#errorDetalle").empty();
            $("#errorDetalle").attr("hidden", true);

            BuscarProductosDetalle(idVentaDetalle);
    })
    .catch(error => console.log("Hubo un error al guardar el detalle, verifique el mensaje de error: ", error))
}

function EliminarDetalle(id) {
    var siElimina = confirm("¿Esta seguro de borrar este Detalle?")
    if (siElimina == true) {
        var ventaID = document.getElementById('IdVentaDetalle').value;

        fetch(`https://localhost:7245/DetallesVentas/${id}`,
            {
                method: "DELETE"
            })
        .then(data => {
            BuscarProductosDetalle(ventaID);
        })
        .catch(error => console.error("No se puedo acceder a la api, verifique mensaje error :", error));
    }
}

function BuscarDetalleVenta(id){
    fetch(`https://localhost:7245/DetallesVentas/${id}`,
        {
            method: "GET"
        }
    )
    .then(response => response.json())
    .then(data => {
        document.getElementById("ProductoId").value = data.productoId;
    })
    .catch(error => console.error("no se pudo acceder al servidor, verifique el mensaje de error: ", error));
}

function EditarDetalleVenta(id){
    let idVentaDetalle = document.getElementById("IdVenta").value;

    let editarDetalleVenta = {
        ventaId: idVentaDetalle,
        productoId: document.getElementById("ProductoId").value
    }

    fetch(`https://localhost:7245//DetallesVentas/${id}`,
        {
            method: "PUT",
            headers: {
                'Countent-Type': 'application/json'
            },
            body: JSON.stringify(editarDetalleVenta)
        }
    )
    .then(response => response.json())
    .then(data => {
        if(data.status == undefined || data.status == 204)
        {
            document.getElementById("ProductoIdEditar").value = "";
            $("#errorEditar").empty();
            $("#errorEditar").attr("hidden", true);

            $("#modalEditarDetallesVentas").modal('hide');
            BuscarProductosDetalle(id);
        }
        else{
            mensajesError('#errorEditar', data);
        }
    })
    .catch(error => console.error("No se puede acceder al servidor: ", error))
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
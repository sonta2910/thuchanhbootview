let arr;
function findAll() {
    $.ajax({
        url: "http://localhost:8080/customers",
        type: "GET",
        success(data) {
            let arr = data
            let context = `<table border="1"><tr>
                            <th>STT</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            
                            <th colspan="2">Action</th>
                            </tr>`
            for (let i = 0; i < arr.length; i++) {
                context += `<tr>
                            <td>${i + 1}</td>
                            <td>${arr[i].firstName}</td> 
                            <td> ${arr[i].lastName}</a></td>
                            
                            <td><button onclick="updateForm(${arr[i].id})">Update</button></td>
                          
                            <td><button onclick="deleteCustomer(${arr[i].id})">Delete</button></td>
                            </tr>`
            }
            context += `</table>`
            document.getElementById("display").innerHTML = context
            $("#form").hide()
            $("#display").show()
        }
    })
}
function createForm() {
    $("#firstName").val("")
    $("#lastName").val("")
    document.getElementById("title").innerHTML = "Create Form"
    $("#form").show()
    document.getElementById("action").setAttribute("onclick", "createCustomer()")
    document.getElementById("action").innerHTML = "Create"
    $("#display").hide()
}
function createCustomer(){
    let customer = {
        firstName: $("#firstName").val(),
        lastName: $("#lastName").val(),
      
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/customers",
        type: "POST",
        data: JSON.stringify(customer),
        success() {
            findAll()
        }
    })
    event.preventDefault()
}
function updateForm(id){
    $.ajax({
        url: `http://localhost:8080/customers/${id}`,
        type: "GET",
        success(data){
            $("#firstName").val(data.firstName)
            $("#lastName").val(data.lastName)
           
            document.getElementById("title").innerHTML="Update form"
            $("#form").show()
            document.getElementById("action").setAttribute("onclick",`updateCustomer(${id})`)
            document.getElementById("action").innerHTML="Update"
            $("#display").hide()
        }
    })
}
function updateCustomer(id){
    let customer = {
        id: id,
        firstName: $("#firstName").val(),
        lastName: $("#lastName").val(),
        
    }
    $.ajax({
        url: "http://localhost:8080/customers",
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(customer),
        success() {
            findAll()
        }
    })
    event.preventDefault()
}
function deleteCustomer(id) {
    if (confirm("Are You Sure To Delete This Customer?")) {
        $.ajax({
            url: `http://localhost:8080/customers/${id}`,
            type: "DELETE",
            success() {
                findAll()
            }
        })
    }
}
function backHome() {
    $("#form").hide()
    $("#detail").hide()
    $("#display").show()
    event.preventDefault()
}
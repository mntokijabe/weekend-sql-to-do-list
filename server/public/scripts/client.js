console.log('JS is sourced!');
getTodoList()

// Make GET function to get jobList

function getTodoList () {
    console.log("sending request to get list");
    axios({
        method: 'GET',
        url: '/todos'
    })
    .then((response) => {
        console.log('received job list',response.data);
        displayList(response.data)
        })
    .catch((error) => {
        console.log('error getting todo list', error)
        })
}  // end getTodoList

// Make POST function to add a job

function addTodo(event){
    event.preventDefault();
    const makeTodo = {
        toDo: document.querySelector('#enterTask').value
        }
    console.log('sending new todo')
    axios({
        method: 'POST',
        url: '/todos',
        data: makeTodo
      }).then(function(response) {
        console.log(response.data);
        document.getElementById('entry').reset();
        getTodoList();
    
      }).catch(function(error) {
        console.log('error in todo POST', error); 
        alert('Error adding to-do. Please try again later.')       
      });
    
 }





// Make PUT function to update job status

function jobComplete(finishId) {
    const jobId = finishId;
    console.log('the job id is',jobId)
    axios ({
        method: "PUT",
        url: (`/todos/${jobId}`)
    }) 
    .then((response) => {
        console.log('changed job status')
        getTodoList();
    })
    .catch((error) => {
        console.log('Error in changing job status', error)
    })
}


// Make DELETE function to remove job
function removeJob(taskId) {
    const jobId = taskId
    // Swal.fire({
    //     title: "Are you sure you want to delete?",
    //     showDenyButton: true,
    //     showCancelButton: false,
    //     confirmButtonText: "Yes, Delete",
    //     denyButtonText: `No, Do Not Delete`
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       Swal.fire("Deleted", "", "success");
        axios({
            method: 'DELETE',
            url: `/todos/${jobId}`
        })
        .then((response) => {
            getTodoList();
            console.log('job has been deleted')
        })
        .catch(error => {
            console.log('there was an error deleting the job', error)
        })
//         }  // end if
//         else if (result.isDenied) {
//             Swal.fire("No Changes Made", "", "success");
//         }
//     });
}    

// Make function to DISPLAY the job list
function displayList(jobs){

    document.querySelector('.jobList').innerHTML = ``

    let tableSpot = document.querySelector('.jobList')
    for (let item of jobs){
        let complete = 'Unfinished';
        if(item.isComplete === true){
            complete = 'Done'
            tableSpot.innerHTML += `
            <tr data-testid="toDoItem" class="completed">
            <td>${item.text}</td>
            <td>${complete}</td>
            <td><button data-testid="completeButton" onClick="jobComplete(${item.id})">Mark Unfinished</button>
            <td><button data-testid="deleteButton" onClick="removeJob(${item.id})">Delete</button>
            `
        }
        else{complete = "Unfinished"
        tableSpot.innerHTML += `
        <tr data-testid="toDoItem" class="incomplete">
        <td>${item.text}</td>
        <td>${complete}</td>
        <td><button data-testid="completeButton" onClick="jobComplete(${item.id})">Mark Complete</button>
        <td><button data-testid="deleteButton" onClick="removeJob(${item.id})">Delete</button>
        `
        }
    }
}
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




// Make PUT function to update job status




// Make DELETE function to remove job


// Make function to DISPLAY the job list
function displayList(jobs){
    let complete = 'Unfinished';
    console.log(jobs);

    let tableSpot = document.querySelector('.jobList')
    for (let item of jobs){
        if(item.isComplete === true){
            complete = 'Done'
        }
        else{complete = "Unfinished"}
        console.log(complete)
        tableSpot.innerHTML += `
        <tr data-testid="toDoItem class="incomplete">
        <td>${item.text}</td>
        <td>${complete}</td>
        <td><button data-testid="completeButton" onClick="jobComplete(${item.id})">Mark Complete</button>
        <td><button data-testid="deleteButton" onClick="removeJob(${item.id})">Delete</button>
        `

    }
}
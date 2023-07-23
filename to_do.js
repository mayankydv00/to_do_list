
var input = document.getElementById("work");
document.getElementById("date").valueAsDate = new Date();
document.getElementById("date_from").valueAsDate = new Date();
document.getElementById("date_to").valueAsDate = new Date();

input.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        if (input.value == "")
            alert("Enter some task");
        else
            document.getElementById("mybtn").click();
    }
});

let arr = [];
let filterarr = [];


// document.getElementById("filter_submit").addEventListener("click" , ()=>{
//     filter_fun();
// });

function filter_fun() {

    let dateFrom = document.getElementById("date_from").value;
    let dateTo = document.getElementById("date_to").value;
    let cat = document.getElementById("category_filter").value;
    let prior = document.getElementById("priority_filter").value;
    dateFrom = new Date(dateFrom).getTime();
    dateTo = new Date(dateTo).getTime();

    
    
    for (let i = 0; i < arr.length; i++) {
        let tempDate = new Date(arr[i].date).getTime();
        if (arr[i].category == cat && arr[i].priority == prior && tempDate >= dateFrom && tempDate <= dateTo) {
            filterarr.push(arr[i]);
        }
    }

    print_work(filterarr);



}

function add_work() {

    let todo = document.getElementById("work").value;
    let category = document.getElementById("category").value;

    let date = document.getElementById("date").value;
    var e = document.getElementById("priority").value;
    //var v = e.options[e.selectedIndex].value;


    document.getElementById("work").value = "";
    if (todo == "")
        alert("Enter some task");
    else {
        arr.push({
            "id": arr.length, "text": todo, "check": false, "category": category, "date": date, "priority": e,
            "subtask": subtask_arr
        });
        subtask_arr = [];
        // clear_items();
        localStorage.setItem("todos", JSON.stringify(arr));
        print_work(arr);
        

    }
}

function clear_items() {
    filterarr = [];
    search_arr = [];
    var temp = document.getElementsByClassName("items");
    let n = temp.length;
    for (let i = 0; i < n; i++) {
        temp[0].remove();
    }

}
function print_work2(){
    print_work(arr);
}

function print_work(arr) {
    clear_items();
    console.log(arr);
    for (let i = 0; i < arr.length; i++) {

        let check_box = document.createElement("input");
        check_box.type = 'checkbox';
        check_box.classList.add("checkbox");
        check_box.size = "30";

        let b = document.createElement("div");
        b.classList.add("item_data");
        b.innerHTML = arr[i].text;



        // let x = document.createElement("div");
        // x.classList.add("category_data");
        // x.innerHTML =   arr[i].category;

        let editButton = document.createElement('button');
        editButton.innerHTML = "Edit";
        editButton.classList.add("edit");
        editButton.id = i;
        editButton.onclick = function () { edit_fun(editButton.id) };

        let c = document.createElement("button");
        c.innerHTML = "Delete";
        c.classList.add("delete");
        c.id = i;
        c.onclick = function () { delete_fun(c.id) };

        let subTaskList = document.createElement("div");
        subTaskList.classList.add("subtask_container");

        for (let j = 0; j < arr[i].subtask.length; j++) {
            let x = document.createElement("div");
            x.innerHTML = arr[i].subtask[j];
            subTaskList.append(x);

        }
        let priortiy_value = "HIGH";
        if (arr[i].priority == 1)
            priortiy_value = "LOW";
        if (arr[i].priority == 2)
            priortiy_value = "MEDIUM";


        let cat_prior = document.createElement("div");

        let cat = document.createElement("div");
        cat.innerHTML = "Category:- " + arr[i].category;
        cat.classList.add("cat_prior_date");
        let prior = document.createElement("div");
        prior.innerHTML = "Priority:- " + priortiy_value;
        prior.classList.add("cat_prior_date");
        let date = document.createElement("div");
        date.innerHTML = "Due Date:- " + arr[i].date;
        date.classList.add("cat_prior_date");
        // prior.innerHTML = new Date(arr[i].date).getTime();

        let d = document.createElement("div");
        d.classList.add("items");
        d.append(check_box);
        d.append(b);
        d.append(subTaskList);
        if (arr[i].category != "")
            d.append(cat);
        d.append(prior);
        d.append(date);
        // d.append(x);
        d.append(c);
        d.append(editButton);


        document.getElementById("list").append(d);
    }


}

function edit_fun(pos) {
    const todos = document.getElementsByClassName('items');
    const editItem = todos[pos];
    //console.log(editItem);
    editItem.childNodes[1].setAttribute("contenteditable", true);
    editItem.childNodes[2].setAttribute("contenteditable", true);
    let saveButton = document.createElement('button');
    saveButton.innerHTML = "Save";
    saveButton.classList.add("save");
    saveButton.id = pos;
    saveButton.onclick = function () { save_fun(pos) };
    editItem.append(saveButton);
    //editDiv.setAttribute("contenteditable", true);

}

function save_fun(pos) {
    const todos = document.getElementsByClassName('items');
    const editItem = todos[pos];
    console.log(editItem);
    editItem.childNodes[1].setAttribute("contenteditable", false);
    // editItem.childNodes[2].setAttribute("contenteditable", false);
    //console.log(editItem.children[4]);
    editItem.removeChild(editItem.lastChild);
    arr[pos].text = editItem.childNodes[1].innerHTML;
    // arr[pos].subtask = editItem.childNodes[2].innerHTML;
}

function delete_fun(pos) {

    arr.splice(pos, 1);
    clear_items();
    print_work(arr);

}
let subtask_arr = [];
function add_subtask() {
    const temp = document.getElementById("subtask_text");
    subtask_arr.push(temp.value);
    temp.value = '';

    console.log(subtask_arr);

}

function deadline(){
    let temp = [];
    let date1 = new Date().getTime();
    for(let i = 0; i < arr.length; i++){
        let date2 = new Date(arr[i].date).getTime();
        if(date2 < date1) temp.push(arr[i]);
    }

    print_work(temp);
}

function sort_fun() {
    let temp =arr;
    if(filterarr != [] )
    temp = filterarr;
    else if (search_arr != [] )
    temp = search_arr ;
    
    if (document.getElementById("date_sorting").checked) {
        if (document.getElementById("asend_sorting").checked) {


            temp.sort(function (a, b) {
                let date1 = new Date(a.date).getTime();
                let date2 = new Date(b.date).getTime();
                console.log(date1);
                console.log(date2);

                return date1 - date2;
            })



        }
        else {

            temp.sort(function (a, b) {
                let date1 = new Date(a.date).getTime();
                let date2 = new Date(b.date).getTime();

                return date2 - date1;
            })
        }


    }
    else if (document.getElementById("priority_sorting").checked) {
        if (document.getElementById("asend_sorting").checked) {


            temp.sort(function (a, b) {
                return a.priority - b.priority;
            })

        }
        else {

            temp.sort(function (a, b) {
                return b.priority - a.priority;
            })
        }
    }

    print_work(temp);


}
let search_arr = [];

function search_fun(){
    

    let search_text = document.getElementById("search_text").value;
    
    for(let i=0;i<arr.length; i++){
        if(arr[i].text.includes(search_text))
        search_arr.push(arr[i]);
        else if(arr[i].category.includes(search_text)){
            search_arr.push(arr[i]);
        }
        else {
            for(let j=0;j<arr[i].subtask.length;j++){
                if(arr[i].subtask[j].includes(search_text)){
                    search_arr.push(arr[i]);
                    break;
                }
            }
        }
    }

   
    print_work(search_arr);
    

}
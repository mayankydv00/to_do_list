
var input = document.getElementById("work");

input.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        if (input.value == "")
            alert("Enter some task");
        else
            document.getElementById("mybtn").click();
    }
});

let arr = [];

function add_work() {

    let c = document.getElementById("work").value;
    document.getElementById("work").value = "";
    if (c == "")
        alert("Enter some task");
    else {
        arr.push({ "id": arr.length, "value": c , "check" : false });
        // clear_items();
        print_work();

    }
}

function clear_items() {
    var temp = document.getElementsByClassName("items");
    let n = temp.length;
    for (let i = 0; i < n; i++) {
        temp[0].remove();
    }

}

function print_work() {
    clear_items();

    for (let i = 0; i < arr.length; i++) {

        let check_box = document.createElement("input" );
        check_box.type = 'checkbox';
        check_box.classList.add("checkbox");
        check_box.size = "30";

        let b = document.createElement("div");
        b.classList.add("item_data");
        b.innerHTML = arr[i].id + " :- " + arr[i].value;

        let c = document.createElement("button");
        c.innerHTML = "Delete";
        c.classList.add("delete");
        c.id = i;
        c.onclick = function () { delete_fun(c.id) };

        let d = document.createElement("div");
        d.classList.add("items");
        d.append(check_box);
        d.append(b);
        d.append(c);

        document.getElementById("list").append(d);
    }


}
function delete_fun(pos) {

    arr.splice(pos, 1);
    clear_items();
    print_work();

}

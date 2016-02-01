var DIV_COUNT = 0;

function add_input(name, divname, ro){
    var root = document.getElementById("root");
    var div = document.createElement("DIV");
    var root_div = document.getElementById(divname);
    
    var label = document.createElement("SPAN");
    var input = document.createElement("INPUT");
    div.className = "form-input";

    label.innerHTML = "</br>" + name + ": ";
    label.id = "basic-addon1";
    label.className = "input-group-addon";

    input.type="number";
    input.id=name;
    input.className = "form-control";
    input.value=10;
    input.setAttribute("aria-describedby", "basic-addon1");
    if (ro) input.readOnly = true;
    root_div.appendChild(label);
    root_div.appendChild(input);
    root.appendChild(root_div);
};

function get_input(name){
    var input = document.getElementById(name);
    return Number(input.value);
};

function set_input(name, nvalue){
    var input = document.getElementById(name);
    var event = new CustomEvent("input", {"detail": "Value has changes."});
    input.value = nvalue;
    input.dispatchEvent(event);
};

function add_div(name){
    DIV_COUNT += 1;
    var root = document.getElementById("root");
    var column = document.createElement("DIV");
    column.setAttribute("id", name);
    column.setAttribute("class", "col-sm-6 col" + DIV_COUNT);
    root.appendChild(column);
}
function set_up(){
    add_div("inputForms");
    add_div("outputForms");
    add_input("ClassTimePerCredit", "inputForms", false); set_input("ClassTimePerCredit", 0.9);
    add_input("HomeWorkTimePerCredit","inputForms", false); set_input("HomeWorkTimePerCredit", 1);
    add_input("InternshipTime","inputForms", false);
    add_input("OtherCommitments","inputForms", false);
    add_input("CreditsTaken","inputForms", false); set_input("CreditsTaken", 15);
    add_input("AvgStartTime","inputForms", false);
    add_input("AvgStopTime","inputForms", false);set_input("AvgStopTime", 22);
      
    add_input("STATIC_LOAD","outputForms", true);
    add_input("DYNAMIC_LOAD","outputForms", true);
          
    add_input("TOTAL_LOAD","outputForms", true);
    add_input("ACTIVE_TIME","outputForms", true);
    add_input("FREE_TIME","outputForms", true);
    
    add_input("FREE_WORK_RATIO","outputForms", true);
    add_input("WORK_FREE_RATIO","outputForms", true);
}

function update(){
    // active time refers to time the individual is able to compleate tasks.
    // active_time = avg_stop_time - avg_start_time;
    var active_time = 7.0 * (get_input("AvgStopTime") - get_input("AvgStartTime"));
    set_input("ACTIVE_TIME", active_time);

    // static_load refers to time on tasks that must occurs at a specific time.
    // static_load = (credits * class_per_credit) + internship_time + other_commitments
    var static_load = get_input("ClassTimePerCredit") * get_input("CreditsTaken");
    static_load += get_input("InternshipTime");
    static_load += get_input("OtherCommitments");
    set_input("STATIC_LOAD", static_load);

    // dynamic_load refers to time on tasks that are doable at any time (in essence).
    // dynamic_load = homework_time_per_credit * credits_taken
    var dynamic_load = get_input("HomeWorkTimePerCredit") * get_input("CreditsTaken");
    set_input("DYNAMIC_LOAD", dynamic_load);

    // total_load = static_load + dyn_load;
    var total_load = get_input("STATIC_LOAD", static_load);
    total_load += get_input("DYNAMIC_LOAD", static_load);
    set_input("TOTAL_LOAD", total_load);

    // free_time = active_time - total_load;
    var free_time = get_input("ACTIVE_TIME") - get_input("TOTAL_LOAD");
    set_input("FREE_TIME", free_time);
    
    // free_work_ratio = free_time / total_load (>1 is good)
    // work_free_ratio = total_load / free_time (>1 is not good)
    var free_work_ratio = get_input("FREE_TIME") / get_input("TOTAL_LOAD");
    set_input("FREE_WORK_RATIO", free_work_ratio);
    set_input("WORK_FREE_RATIO", 1.0 / free_work_ratio);
};

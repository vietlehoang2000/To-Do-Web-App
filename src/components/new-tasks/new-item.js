import { useState } from "react"

export default function NewTask({prioritizeTasks,tasks,setAppPage,setTasks}){

    const [newItemName,setNewItemName] = useState('');
    const [newItemDesc, setNewItemDesc] = useState('');
    const [newItemDueDate, setNewItemDueDate] = useState('');
    const [newItemPriority,setNewItemPriority] =useState(2);
    const currentDate = new Date();
   

    function addNewItem(e){
        e.preventDefault();
        if(newItemName!==''&&newItemDesc!==''&&newItemDueDate!==""){
            let refTasks = [...tasks];
        console.log(newItemName,newItemDesc,newItemDueDate,newItemPriority);
        const createDate= new Date();
        const newTask={
            id: refTasks.length+1,
            name: newItemName,
            description:newItemDesc,
            priority:newItemPriority,
            createdAt:createDate,
            dueDate: newItemDueDate,
            deletedAt:"",
            isChecked:false
        }
        refTasks.push(newTask)
        console.log(refTasks)
        setTasks(refTasks)
        }
    }

    function returnHomePage(){
        let refTasks = [...tasks];
        prioritizeTasks(refTasks);
        setAppPage('home');
    }

    return(<div className="newTask">
        <h1>New Task</h1>
        <div className="newTask-details">
            <form action="#">
            <input placeholder="Add new task ..." name="name" id="name" required="required" onChange={(e)=>setNewItemName(e.target.value)}></input>
            <h4>Description</h4>
            <textarea type="textarea" id="description" name="description" onChange={(e)=>setNewItemDesc(e.target.value)}></textarea>
            <div className="expand--splitBlock">
            <div className="dueDateBlock">
            <h4>Due Date</h4>
            <input
            id="dueDate"
              type="date"
              name="dueDate"
              required="required"
              min={ currentDate.toISOString().split('T')[0]}
              max="2030-12-31"
              onChange={(e)=>setNewItemDueDate(e.target.value)}
            ></input>
         </div>
         <div className="priorityBlock">
          <h4>Priority</h4>
          <select id="priority" value={newItemPriority} onChange={(e)=>setNewItemPriority(e.target.value)}>
              <option value={1}>Low</option>
              <option value={2}>Normal</option>
              <option value={3}>High</option>
          </select>
          </div>
          </div>
          <button className="btn btn__lg btn--update" type="submit" style={{marginTop:"10px"}} onClick={(e)=>addNewItem(e)}>Add</button>
          </form>
          
          <button className="btn btn__lg btn--update" onClick={()=>{returnHomePage()}} style={{marginTop:"10px",backgroundColor:"rgb(32,150,243)"}}>Done</button>
        </div>
    </div>)
}
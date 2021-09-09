import {  useEffect, useState } from "react";

export default function Items({ setTasks, tasks, item,prioritizeTasks,checkStatus }) {

  const [itemExpand,setItemExpand] = useState('hide');
  const [itemName,setItemName] = useState(item.name);
  const [itemDesc,setItemDesc] = useState(item.description);
  const [itemPriority,setItemPriority]= useState(item.priority);
  const [itemDueDate,setItemDueDate]= useState(item.dueDate);
  const [itemIsChecked, setItemIsChecked] = useState(item.isChecked)

  const currentDate = new Date();

  useEffect(()=>{
    if(checkStatus===false){
      setItemIsChecked(false)
    }
  },[checkStatus])


  function handleItemChange(){
    let refTasks = [...tasks];
    refTasks.map((refItem)=>{
      if(refItem.id === item.id){
        refItem.name = itemName;
        refItem.description =itemDesc;
        refItem.priority= itemPriority;
        refItem.dueDate = itemDueDate;
      }
      return null;
    })
    
    localStorage.setItem("data", JSON.stringify(refTasks));
    prioritizeTasks(refTasks)
  }

  function toggleItemExpand(){
    if(itemExpand==="hide"){
      setItemExpand("show")
    }
    else{
      setItemExpand("hide")
    }
  }

  function removeSingleTask(){
    let refTasks = [...tasks];
    refTasks.map((refItem)=>{
      if(refItem.id === item.id){
        const currentTime = new Date();
        refItem.deletedAt = currentTime;
      }
      return null;
    })

    localStorage.setItem("data", JSON.stringify(refTasks));
    prioritizeTasks(refTasks)
  }

  function changeIsCheckedStatus(e){
    let refTasks = [...tasks];
    refTasks.map((refItem)=>{
      if(refItem.id === item.id){
        refItem.isChecked = e;
        
      }
      return null;
    })
  
    prioritizeTasks(refTasks)
    setItemIsChecked(e);
  }

  return (
    <div className="items">
      <div className="item-detail">
          <div className="detail--leftBlock">
        <input
          type="checkbox"
          className={`checkbox check-${item.id} `}
          name="checkbox"
          checked={itemIsChecked}
          onChange={(e)=>changeIsCheckedStatus(e.target.checked)}
        ></input>
        <h4>{item.name}</h4>
        </div>
        <div className="detail--rightBlock">
        <button className="btn btn__sm btn--detail" onClick={()=>toggleItemExpand()} style={{marginRight:"10px"}}>Detail</button>
        <button className="btn btn__sm btn--remove" onClick={()=>removeSingleTask()}>Remove</button>
        </div>
      </div>
      <div className={`item-expand dropdown ${itemExpand}`}>
        <form>
          <input type="text" value={itemName} id="name" name="name" onChange={(e)=>setItemName(e.target.value)}></input><br/>
          <h4>Description</h4>
          <textarea type="textarea" id="description" name="description" value={itemDesc} onChange={(e)=>setItemDesc(e.target.value)}></textarea>
          <div className="expand--splitBlock">
            <div className="dueDateBlock">
            <h4>Due Date</h4>
            <input
            id="dueDate"
              type="date"
              name="dueDate"
              value={itemDueDate.split(" ")[0]}
              onChange={(e)=>setItemDueDate(e.target.value)}
              min={ currentDate.toISOString().split('T')[0]}
              max="2030-12-31"
            ></input>
         </div>
         <div className="priorityBlock">
          <h4>Priority</h4>
          <select id="priority" value={itemPriority} onChange={(e)=>setItemPriority(e.target.value)}>
              <option value={1}>Low</option>
              <option value={2}>Normal</option>
              <option value={3}>High</option>
          </select>
          </div>
          </div>
        </form>
        <button className="btn btn__lg btn--update" onClick={()=>handleItemChange()}>Update</button>
      </div>
    </div>
  );
}

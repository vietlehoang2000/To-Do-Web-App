export default function Search({prioritizeTasks,tasks,setTasks}){
    function search(e){
        if(e!==''){
        let refTasks = [...tasks];
        refTasks.map((item,index)=>{
            if(!item.name.includes(e)){
                refTasks.splice(index,1)
            }
            return null;
        })
        setTasks(refTasks);
        }
        else{
            let data = JSON.parse(localStorage.getItem("data") || "[]");
            setTasks(data)
        }
    }

    return(<input type="text" placeholder="Search..." id="search" onChange={(e)=>search(e.target.value)}> 
    </input>)
}
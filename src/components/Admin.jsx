import React, { useEffect, useState } from 'react'

let client = ""

const Admin = () => {
    const [users,setUsers] = useState([])
    const [activeUser,setActiveUser] = useState({from:'',msgs:[]})


    const acUser = (user)=>{
        setActiveUser(user)
    }

    useEffect(()=>{
        users.forEach((user)=>{
            if(user.from == activeUser.from ) {setActiveUser(prev => user)}
        })
    },[users])

    const handlemsg = (e,fr) => {
        if (e.key === 'Enter' && e.target.value != "") {
          client.send(JSON.stringify({msg:e.target.value,to:activeUser.from}))
          console.log("msg sent  "+e.target.value)
          setUsers(prev => {
            let newu = prev.map(user => {
                let msgd = user.msgs
                if(user.from == fr) { return {...user,msgs:[...msgd,{msg:e.target.value,type:"admin"}]} }
                else return user
            })

            e.target.value = ""
            return newu
          })

        }
    }
    useEffect(()=>{
        if(client == "") {client = new WebSocket("ws://127.0.0.1:8000/ws/server/admin");}
        client.onmessage = (e)=>{
            const event = JSON.parse(e.data)
            if(event.do == "new" ) userConnected(event)
            else if(event.do == "old" ) userDisonnected(event)
            else userMessaged(event)
        }
        return ()=>{client = ""}
    },[])

    const userConnected = (event)=> {
        setUsers(prev => {
        let isThere = false
        let newUsers = prev.map(user=>{
            if( user.from == event.from ) {isThere=true; return {...user , conn:true}}
            else return user
        })
        if(isThere) return newUsers
        else return [...prev,{from:event.from , conn:true , msgs:[] , cnt:0}]
        })
    }
    const userDisonnected = (event)=> {
        setUsers(prev => {
            let isThere = false
            let newUsers = prev.map(user=>{
            if( user.from == event.from ) {isThere=true;return {...user , conn:false}}
            else return user
                })
            if(isThere) return newUsers
            return prev
        })

    }
    function userMessaged(event){
        setUsers(prev => {
            console.log(event.from)
            let isThere = false
            let newUsers = prev.map((user)=>{
            console.log(user.from)
            if( user.from == event.from ) {
                isThere=true;console.log(user);
                let zz = {from:event.from, conn:true , cnt:user.cnt+1 , msgs:[...user.msgs,{msg:event.msg,type:'user'}]}
                return zz 
            }
            else return user
        })
        if(isThere) return newUsers
        else return [...prev,{from:event.from , conn:true , msgs:[{msg:event.msg,type:"user"}] , cnt:1}]
            
        })
        
    }
    

  return (
    <div className='w-full h-full flex justify-evenly'>
        <div id='input-message' className={`min-h-[500px] max-h-[500px] ${activeUser.from !== '' ? '':'hidden'} flex flex-col justify-start mt-10 pr-10 border-r-[2px] border-r-solid border-r-amber-400`}>
            <h1 className='underline underline-offset-2 text-lg'>Messages</h1>
            <div className='overflow-hidden overflow-y-auto mt-4 px-5'>
                
                {
                    activeUser.msgs?.map((msgl,id)=>{
                        return <h2 key={id} className={`my-2 ${msgl.type=="admin"?"text-right":""}`}>{msgl.msg}</h2>
                    })
                }
                
            </div>
            <input onKeyDown={(e)=>handlemsg(e,activeUser.from)} className="mt-5" />
        </div>
        <div className={`${activeUser.from !== '' ? 'hidden':''}`}></div>
        <div id='connected-users' className='flex flex-col justify-start mt-10'>
            <h1 className='underline underline-offset-2 text-lg'>Connected Users</h1>
            {
                users.map((user,index)=>{return (
                    <div key={index} id="user-widget" onClick={()=>acUser(user)} className='flex justify-between px-2 py-5 gap-2 hover:bg-gray-700 cursor-pointer rounded-2xl'>
                        <h1 className={`${user.conn?'text-green-500':'text-red-700' } text-xxl text-center`}>&#x2022;</h1>
                        <h1 className='text-xxl text-center'>{user.from}</h1>
                        <h1 className='bg-red-800 rounded-full text-xxl'>{user.cnt}</h1>
                    </div>
                )})
            }
            
        </div>
        
    </div>
  )
}

export default Admin
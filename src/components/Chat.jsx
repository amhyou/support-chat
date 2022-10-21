import React, { useEffect, useState } from 'react'
import chaticon from "../assets/chat.png"
import chatclose from "../assets/close.png"
import sendmsg from "../assets/send-message.png"
import back from "../assets/back.png"

let client = ""
const Chat = () => {
    const [open,setOpen] = useState(false)
    const [conv,setConv] = useState(false)
    const [msgs,setMsgs] = useState([])
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && e.target.value != "") {
          setMsgs(prev => {
            client.send(JSON.stringify({msg:e.target.value,to:'admin'}))
            const newmsgs = [...prev,{msg:e.target.value,type:"user"}]
            e.target.value = ""
            return newmsgs
            })
          
        }
        
      }
    const handleNewConv = ()=>{
        setConv(true);setMsgs([])
        client = new WebSocket("ws://127.0.0.1:8000/ws/server/support");
        client.onmessage = (e)=>{
            const event = JSON.parse(e.data)
            setMsgs(prev => [...prev,{msg:event.msg,type:"admin"}])
        }
        
    }
  return (
    <div className='w-full h-full fixed flex justify-end items-end flex-col'>
        <div className={`${open && !conv ? '':'hidden'} w-[60%] h-[70%] sm:h-[60%] sm:w-[25%] bg-1 mr-2 mb-2 flex justify-start flex-col`}>
            <div className='bg-3'>
                <h1 className='font-1 text-center text-xl mt-5'>Hi there</h1>
                <p className='font-2 w-[90%] mx-auto mt-5 mb-10'>A programmer is ready to take your request right now</p>
            </div>
            <div className="mt-10 p-5">
                <div className='flex justify-center bg-4 hover:bg-2 p-5 cursor-pointer' onClick={handleNewConv}>
                    <img src={sendmsg} alt="sendmsg" className='w-8' />
                    <button className='ml-2 font-3'>New Conversation</button>
                </div>
            </div>
        </div>

        <div className={`${open && conv ? '':'hidden'} w-[60%] h-[70%] sm:h-[60%] sm:w-[25%] bg-1 mr-2 mb-2 flex justify-between flex-col`}>
            <div className='bg-3 flex items-center justify-between'>
                <img src={back} alt="back" className='w-8 h-5 hover:bg-2 ml-2' onClick={()=>setConv(false)} />
                <h1 className='font-1 text-center text-xl mt-5 mb-5'>Conversation</h1>
                <h1></h1>
            </div>
            <div className="max-h-[80%] mt-10 p-5 flex gap-0 flex-col justify-end">
                <div className='overflow-hidden overflow-y-auto px-5'>
                {
                msgs.map((elm,i)=>{
                   return <h2 className={`my-4 font-1 text-lg ml-2 ${elm.type=="admin"?"text-right":""}`} key={i} >{elm.msg}</h2>
                })
                }
                </div>

                <input placeholder='say hi' className='h-8 mt-2' onKeyDown={handleKeyPress} />
                
            </div>
        </div>

        <div className=' rounded-3xl w-14 bg-2 p-3 mr-2 mb-2 hover:bg-3 hover:mb-3 cursor-pointer' onClick={()=>setOpen(!open)}>
            <img src={chaticon} className={`${open ? 'hidden':""}`} alt="chat" />
            <img src={chatclose} className={`${open ? '':"hidden"}`} alt="chat" />
        </div>
    </div>
  )
}

export default Chat
import "./index.css"
import wrapper from "../Account_wrapper/index.tsx";
import { useState } from "react";

// Hard coded data
const AllChats = [
  {
    users : [{
      name : "Nguyen Van A",
      type : "Tutor",
    }],
    chats : [
      {
        content : `Hello! I have reviewed your assignment. You did a great job, but there are a few points to correct.`,
        time : "10:28 AM",
        from : 0,
      },
      {
        content : `Thank you, Tutor! Where can I find the notes?`,
        time : "10:29 AM",
        from : -1, //-1 means from self
      },
      {
        content : "Ok, I'll send you the document now. Please check it.",
        time : "10:30AM",
        attached : "📄 Assignment_Feedback.docx ⬇️",
        from : 0,
      }
    ]
  },
  {
    users : [{
      name : "Tran Thi B",
      type : "Student"
    }],
    chats : [{
      content : "Thank you for the session!",
      time : "08:00AM Yesterday",
      from : 0
    }]
  },
  {
    users : [{
      name : "Dao Thi C",
      type : "Student"
    }],
    chats : [{
      content : "Can you correct this essay I wrote? It feels really clunky",
      time : "10:00PM Yesterday",
      from : 0,
      attached : "📄 Essay.pdf ⬇️",
    }]
  },
]

type Chat = {
  content : string,
  time : string,
  from : number,
  attached? : string,
}

type UserInfo = {
  name : string,
  type : string
}

type T_allChat = {
  users : UserInfo[],
  chats : Chat[]
}[]

function formatChat(c : Chat){
  return (
    <div className={c.from < 0 ? "messageItem self" : "messageItem"}>
      <div className="messageBubble">
        {c.content}
      </div>
      {
        c.attached ?
        <div className="fileBubble">
        {c.attached}
        </div> : null
      }
      <div className="time">{c.time}</div>
    </div>
  )
}

function getSideBar(allChat : T_allChat, highlightIndex : number, setActive : (x : number) => any){
  return (
    <div className="convoList">
    {
      allChat.map((c, index) => 
        <div 
          className={index === highlightIndex ? "convoItem active" : "convoItem"}
          onClick={() => setActive(index)}
        >
          <div className="avatar" />
          <div>
            <p className="name">{c.users[0].type + " " + c.users[0].name}</p>
            <p className="preview">{c.chats.at(-1)!.content.slice(0, 20) + "..."}</p>
          </div>
        </div>
      )
    }
    </div>
  )
}

interface chat_props {
  allChats : T_allChat,
}

function ChatMain(p : chat_props){

  const [chatContent, setChatContent] = useState("")
  const [activeIndex, setActive] = useState(0)
  const [allChat, setAllChat] = useState(p.allChats)

  function submitAndClear(){
    allChat[activeIndex].chats.push({
      content : chatContent,
      time : "JUST NOW",
      from : -1,
    })
    setAllChat(allChat)
    setChatContent("")
  }

  const currChat = allChat[activeIndex]

  return (
    <div className="container">

      <aside className="sidebar">
        <div className="search">
          <input placeholder="Search conversations..." />
        </div>
        {getSideBar(allChat, activeIndex, setActive)}
      </aside>

      {/* Chat Area */}
      <main className="chatArea">
        <div className="messages">
          <div className="messageAuthor">{currChat.users.map(u => u.name).join(" ")}</div>
          {currChat.chats.map(c => formatChat(c))}
        </div>

        {/* Input Area */}
        <div className="inputBar">
          {
            (
              (content : string) => (
                <input 
                  onInput={(event) => {
                      const v = event.currentTarget.value
                      console.log(v)
                      setChatContent(event.currentTarget.value)
                  }}
                  onKeyDown={(event) => {
                    if(event.key === "Enter"){
                      event.preventDefault()
                      submitAndClear()
                    }
                  }} 
                  type="text" 
                  placeholder="Type a message..." 
                  value={content.length === 0 ? undefined : content}
                />
              )
            )(chatContent)
          }

          <button onClick={submitAndClear}>➤</button>
        </div>
      </main>
    </div>
  );
};

export default function Account_chat(){
  return wrapper(<ChatMain allChats={AllChats} />, 4)
}
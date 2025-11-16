import "./index.css"
import wrapper from "../Account_wrapper/index.tsx"

import { CiImport } from "react-icons/ci";
import { HiPlus } from "react-icons/hi";

import FullCalendar from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

function renderEventContent(eventInfo: any) {
  const lines = eventInfo.event.title.split("\n");

  return (
    <div className="fc-custom-event">
      <div className="fc-event-title">{lines[0]}</div>
      {lines.slice(1).map((line: string, i: number) => (
        <div key={i} className="fc-event-desc">
          {line}
        </div>
      ))}
    </div>
  );
}

export default function Account_calendar(){
    const component = (
        <div className="outer-wraper">
            <div className="button-wraper">
                <div className="wrap import-btn">
                    <CiImport/>
                    <div>Import schedule</div>
                </div>
                <div className="wrap avail-btn">
                    <HiPlus/>
                    <div>Create availability</div>
                </div>
            </div>
            <FullCalendar
              plugins={[timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
              slotMinTime="07:00:00"
              slotMaxTime="24:00:00"
              allDaySlot={false}
              editable={true}
              selectable={true}
              slotDuration="01:00:00"
              height="auto"
              eventContent={renderEventContent}
              events={[
                {
                  title: "Imported:\nMyBk Event",
                  start: "2025-10-28T09:00",
                  end: "2025-10-28T11:00",
                  backgroundColor: "#e3ecff",
                  borderColor: "#c6d7ff",
                },
                {
                  title: "Available Slot\n(Tutor A)\n10:00 - 11:00 (Group)",
                  start: "2025-10-30T10:00",
                  end: "2025-10-30T15:00",
                  backgroundColor: "#ddf7e8",
                  borderColor: "#b9ebcf",
                },
                {
                  title: "Booked:\nCalculus 1\n12:00 - 13:00 (w/ Student B)",
                  start: "2025-10-31T12:00",
                  end: "2025-10-31T16:00",
                  backgroundColor: "#fff2cc",
                  borderColor: "#ffe8a3",
                },
              ]}
            />
        </div>
    )
    return wrapper(component, 1)
}
import "./index.css";
import wrapper from "../Account_wrapper/index.tsx";

import { CiImport } from "react-icons/ci";
import { HiPlus } from "react-icons/hi";
import { VscClearAll } from "react-icons/vsc";

import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import {default as ICAL} from "ical.js";

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

type Event = {
  title: string;
  start: string;
  end: string;
  backgroundColor: string;
  borderColor: string;
  isAvailableSlot?: boolean;
};

export default function Account_calendar() {
  const [events, setEvents] = useState<Event[]>([
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
  ]);

  const [selectedSlots, setSelectedSlots] = useState<any[]>([]);

  const handleSelect = (selectionInfo: any) => {
    setSelectedSlots((prev) => [
      ...prev,
      {
        start: selectionInfo.start,
        end: selectionInfo.end,
      },
    ]);
  };

  const handleCreateAvailability = () => {
    const newEvents = selectedSlots.map((slot) => ({
      title: "Marked available Slot",
      start: slot.start,
      end: slot.end,
      backgroundColor: "#ddf7e8",
      borderColor: "#b9ebcf",
      isAvailableSlot: true,
    }));
    setEvents((prevEvents) => [...prevEvents, ...newEvents]);
    setSelectedSlots([]); // Clear selected slots after creating availability
  };

  const clearAllAvailable = () => {
    const newEvent = events.filter((e) => !e.isAvailableSlot);
    setEvents(newEvent);
  };

  const handleImportSchedule = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      try {
        const jcalData = ICAL.parse(content);
        const vcalendar = new ICAL.Component(jcalData);
        const vevents = vcalendar.getAllSubcomponents("vevent");

        const importedEvents = vevents.map((vevent) => {
          const event = new ICAL.Event(vevent);
          return {
            title: event.summary,
            start: event.startDate.toString(),
            end: event.endDate.toString(),
            backgroundColor: "#e3ecff",
            borderColor: "#c6d7ff",
          };
        });

        setEvents((prevEvents) => [...prevEvents, ...importedEvents]);
      } catch (error) {
        console.error("Failed to parse .ics file:", error);
      }
    };

    reader.readAsText(file);
  };

  const component = (
    <div className="outer-wraper">
      <div className="button-wraper">
        <div className="wrap import-btn">
          <CiImport />
          <label>
            Import schedule
            <input
              type="file"
              accept=".ics"
              style={{ display: "none" }}
              onChange={handleImportSchedule}
            />
          </label>
        </div>
        <div
          className={`wrap avail-btn ${
            selectedSlots.length > 0 ? "active" : ""
          }`}
          onClick={handleCreateAvailability}
        >
          <HiPlus />
          <div>Create availability</div>
        </div>
        <div className="wrap clear-btn" onClick={clearAllAvailable}>
          <VscClearAll />
          <div>Clear all availability</div>
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
        select={handleSelect}
        slotDuration="01:00:00"
        height="auto"
        eventContent={renderEventContent}
        events={events}
      />
    </div>
  );
  return wrapper(component, 1);
}
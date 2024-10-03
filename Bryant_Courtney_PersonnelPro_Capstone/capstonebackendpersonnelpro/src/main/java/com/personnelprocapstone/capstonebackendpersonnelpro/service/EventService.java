package com.personnelprocapstone.capstonebackendpersonnelpro.service;

import com.personnelprocapstone.capstonebackendpersonnelpro.entity.Event;
import com.personnelprocapstone.capstonebackendpersonnelpro.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EventService {

    private final EventRepository eventRepository;

    @Autowired
    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public List<Event> getEventsByDateRange(LocalDate startDate, LocalDate endDate) {
        return eventRepository.findByDateBetween(startDate, endDate);
    }

    public Event addEvent(Event event) {
        return eventRepository.save(event);
    }
}
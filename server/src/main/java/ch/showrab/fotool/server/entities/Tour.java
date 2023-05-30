package ch.showrab.fotool.server.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Tour {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String tourName;
    private boolean hidden;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTourName() {
        return tourName;
    }

    public void setTourName(String tourName) {
        this.tourName = tourName;
    }

    public boolean isHidden() {
        return hidden;
    }

    public void setHidden(boolean defaultTour) {
        this.hidden = defaultTour;
    }

    @Override
    public String toString() {
        return "Tour{" +
                "id=" + id +
                ", tourName='" + tourName + '\'' +
                ", hidden=" + hidden +
                '}';
    }
}
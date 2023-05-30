package ch.showrab.fotool.server.entities;

import jakarta.persistence.*;

@Entity
public class HighScore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String tourName;
    private Long index;
    private Long score;
    private String teamName;
    private String history;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTourName() {
        return tourName;
    }

    public void setTourName(String tourName) {
        this.tourName = tourName;
    }

    public Long getIndex() {
        return index;
    }

    public void setIndex(Long index) {
        this.index = index;
    }

    public Long getScore() {
        return score;
    }

    public void setScore(Long score) {
        this.score = score;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public String getHistory() {
        return history;
    }

    public void setHistory(String history) {
        this.history = history;
    }

    @Override
    public String toString() {
        return "HighScore{" +
                "id=" + id +
                ", tourName='" + tourName + '\'' +
                ", index=" + index +
                ", score=" + score +
                ", teamName='" + teamName + '\'' +
                ", history='" + history + '\'' +
                '}';
    }
}

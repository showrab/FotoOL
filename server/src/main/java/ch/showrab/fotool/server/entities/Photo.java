package ch.showrab.fotool.server.entities;

import jakarta.persistence.*;

@Entity
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String tourName;
    private boolean hidden;
    private long sortOrder;
    @Column(columnDefinition="CLOB")
    private String photoUrl;
    private double lat;
    private double lng;
    private String hint;

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
    public boolean isHidden() {
        return hidden;
    }

    public void setHidden(boolean hidden) {
        this.hidden = hidden;
    }

    public long getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(long sortOrder) {
        this.sortOrder = sortOrder;
    }
    public String getPhotoUrl() {
        return photoUrl;
    }
    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }
    public double getLat() {
        return lat;
    }
    public void setLat(double lat) {
        this.lat = lat;
    }
    public double getLng() {
        return lng;
    }
    public void setLng(double lng) {
        this.lng = lng;
    }
    public String getHint() {
        return hint;
    }
    public void setHint(String hint) {
        this.hint = hint;
    }

    @Override
    public String toString() {
        return "Photo{" +
                "id=" + id +
                ", tourName='" + tourName + '\'' +
                ", hidden=" + hidden +
                ", sortOrder=" + sortOrder +
                ", photoUrl='" + photoUrl + '\'' +
                ", lat=" + lat +
                ", lng=" + lng +
                ", hint='" + hint + '\'' +
                '}';
    }
}

package br.com.storeFiles.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(
        value = {"createAt", "updateAt"},
        allowGetters = true
)
public abstract class AuditoriaModel implements Serializable {

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "create_at", nullable = false, updatable = false)
    @CreatedDate
    private Date createAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "update_at", nullable = false)
    @LastModifiedDate
    private Date updateAt;
}

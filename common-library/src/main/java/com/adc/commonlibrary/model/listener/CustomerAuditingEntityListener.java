package com.adc.commonlibrary.model.listener;


import com.adc.commonlibrary.model.AbstractAuditEntity;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.auditing.AuditingHandler;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Configuration
public class CustomerAuditingEntityListener extends AuditingEntityListener {
    public CustomerAuditingEntityListener(ObjectFactory<AuditingHandler> handler) {
        super.setAuditingHandler(handler);
    }

    @Override
    @PrePersist
    public void touchForCreate(Object target) {
        super.touchForCreate(target);
        AbstractAuditEntity enity = (AbstractAuditEntity) target;
        if (enity.getCreatedBy() == null) {
            super.touchForCreate(target);
        } else {
            if(enity.getLastModifiedBy() == null) {
                enity.setLastModifiedBy(enity.getCreatedBy());
            }
        }
    }

    @Override
    @PreUpdate
    public void touchForUpdate(Object target) {
        super.touchForUpdate(target);
        AbstractAuditEntity entity = (AbstractAuditEntity) target;
        if (entity.getLastModifiedBy() == null) {
            super.touchForUpdate(target);
        }
    }
}

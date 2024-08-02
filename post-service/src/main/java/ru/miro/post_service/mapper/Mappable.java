package ru.miro.post_service.mapper;

public interface Mappable<E, D> {

    D toDTO(E entity);

    E toEntity(D dto);

}

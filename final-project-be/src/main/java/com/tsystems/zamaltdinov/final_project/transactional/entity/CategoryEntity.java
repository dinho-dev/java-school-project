package com.tsystems.zamaltdinov.final_project.transactional.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.Collection;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode

@Entity
@Table(name = "category", schema = "store", catalog = "postgres")
public class CategoryEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(columnDefinition = "serial")
    private int id;
    @Basic
    @Column(name = "name")
    private String categoryName;
    @OneToMany(mappedBy = "nameByCategoryId")
    private Collection<ProductEntity> productsById;

}

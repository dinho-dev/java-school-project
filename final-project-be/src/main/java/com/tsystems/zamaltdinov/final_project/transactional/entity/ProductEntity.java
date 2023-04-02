package com.tsystems.zamaltdinov.final_project.transactional.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Collection;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString

@Entity
@Table(name = "product", schema = "store", catalog = "postgres")
public class ProductEntity {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    @Column(name = "id")
    private UUID id;
    @Basic
    @Column(name = "category_id")
    private int categoryId;
    @Basic
    @Column(name = "title")
    private String title;
    @Basic
    @Column(name = "price")
    private Integer price;
    @Basic
    @Column(name = "parameters")
    private String parameters;
    @Basic
    @Column(name = "weight")
    private String weight;
    @Basic
    @Column(name = "volume")
    private String volume;
    @Basic
    @Column(name = "quantity_in_stock")
    private Integer quantityInStock;
    @Basic
    @Column(name = "image_url")
    private String imageUrl;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", referencedColumnName = "id", insertable = false, updatable = false)
    private CategoryEntity nameByCategoryId;
    @OneToMany(mappedBy = "productByProductId")
    private Collection<OrderProductEntity> orderProductsById;
}
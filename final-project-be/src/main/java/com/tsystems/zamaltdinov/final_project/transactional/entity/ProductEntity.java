package com.tsystems.zamaltdinov.final_project.transactional.entity;

import jakarta.persistence.*;

import java.util.Collection;
import java.util.UUID;

@Entity
@Table(name = "product", schema = "store", catalog = "postgres")
public class ProductEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private UUID id;
    @Basic
    @Column(name = "category_id")
    private Integer categoryId;
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
    @OneToMany(mappedBy = "productByProductId")
    private Collection<OrderProductEntity> orderProductsById;
    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id", insertable=false, updatable=false)
    private CategoryEntity categoryByCategoryId;

    public ProductEntity() {
    }

    public ProductEntity(UUID id, Integer categoryId, String title, Integer price, String parameters, String weight, String volume, Integer quantityInStock, Collection<OrderProductEntity> orderProductsById, CategoryEntity categoryByCategoryId, String imageUrl) {
        this.id = id;
        this.categoryId = categoryId;
        this.title = title;
        this.price = price;
        this.parameters = parameters;
        this.weight = weight;
        this.volume = volume;
        this.quantityInStock = quantityInStock;
        this.orderProductsById = orderProductsById;
        this.categoryByCategoryId = categoryByCategoryId;
        this.imageUrl = imageUrl;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public String getParameters() {
        return parameters;
    }

    public void setParameters(String parameters) {
        this.parameters = parameters;
    }

    public String getWeight() {
        return weight;
    }

    public void setWeight(String weight) {
        this.weight = weight;
    }

    public String getVolume() {
        return volume;
    }

    public void setVolume(String volume) {
        this.volume = volume;
    }

    public Integer getQuantityInStock() {
        return quantityInStock;
    }

    public void setQuantityInStock(Integer quantityInStock) {
        this.quantityInStock = quantityInStock;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ProductEntity that = (ProductEntity) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (categoryId != null ? !categoryId.equals(that.categoryId) : that.categoryId != null) return false;
        if (title != null ? !title.equals(that.title) : that.title != null) return false;
        if (price != null ? !price.equals(that.price) : that.price != null) return false;
        if (parameters != null ? !parameters.equals(that.parameters) : that.parameters != null) return false;
        if (weight != null ? !weight.equals(that.weight) : that.weight != null) return false;
        if (volume != null ? !volume.equals(that.volume) : that.volume != null) return false;
        if (quantityInStock != null ? !quantityInStock.equals(that.quantityInStock) : that.quantityInStock != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (categoryId != null ? categoryId.hashCode() : 0);
        result = 31 * result + (title != null ? title.hashCode() : 0);
        result = 31 * result + (price != null ? price.hashCode() : 0);
        result = 31 * result + (parameters != null ? parameters.hashCode() : 0);
        result = 31 * result + (weight != null ? weight.hashCode() : 0);
        result = 31 * result + (volume != null ? volume.hashCode() : 0);
        result = 31 * result + (quantityInStock != null ? quantityInStock.hashCode() : 0);
        return result;
    }

    public Collection<OrderProductEntity> getOrderProductsById() {
        return orderProductsById;
    }

    public void setOrderProductsById(Collection<OrderProductEntity> orderProductsById) {
        this.orderProductsById = orderProductsById;
    }

    public CategoryEntity getCategoryByCategoryId() {
        return categoryByCategoryId;
    }

    public void setCategoryByCategoryId(CategoryEntity categoryByCategoryId) {
        this.categoryByCategoryId = categoryByCategoryId;
    }
}

using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ASPAPI_mongo.Models;

public partial class ShoesDbContext : DbContext
{
    public ShoesDbContext()
    {
    }

    public ShoesDbContext(DbContextOptions<ShoesDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Manufacturer> Manufacturers { get; set; }

    public virtual DbSet<Retailer> Retailers { get; set; }

    public virtual DbSet<Shoe> Shoes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
/*#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to*/ /*read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.*/
        => optionsBuilder.UseSqlServer("Server=DESKTOP-5H6NALV\\SQLEXPRESS;Database=ShoesDB;Trusted_Connection=True; TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Manufacturer>(entity =>
        {
            entity.ToTable("Manufacturer");

            entity.Property(e => e.ManufacturerId).HasColumnName("manufacturerID");
            entity.Property(e => e.Country)
                .HasMaxLength(50)
                .HasColumnName("country");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Retailer>(entity =>
        {
            entity.ToTable("Retailer");

            entity.Property(e => e.RetailerId).HasColumnName("retailerID");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Shoe>(entity =>
        {
            entity.ToTable("Shoe");

            entity.Property(e => e.ShoeId).HasColumnName("shoeID");
            entity.Property(e => e.Brand)
                .HasMaxLength(50)
                .HasColumnName("brand");
            entity.Property(e => e.Color)
                .HasMaxLength(50)
                .HasColumnName("color");
            entity.Property(e => e.ManufacturerId).HasColumnName("manufacturerID");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
            entity.Property(e => e.Price).HasColumnName("price");
            entity.Property(e => e.RetailerId).HasColumnName("retailerID");

            entity.HasOne(d => d.Manufacturer).WithMany(p => p.Shoes)
                .HasForeignKey(d => d.ManufacturerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Shoe_manufacturerID_FK");

            entity.HasOne(d => d.Retailer).WithMany(p => p.Shoes)
                .HasForeignKey(d => d.RetailerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Shoe_retailerID_FK");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

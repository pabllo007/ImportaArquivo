package br.com.storeFiles.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@Entity
@Table(name = "ImportaArquivo")
public class ImportacaoArquivo extends AuditoriaModel {

    @Id
    @GeneratedValue(generator = "importaArquivo_generator")
    @SequenceGenerator(name = "importaArquivo_generator", sequenceName = "importaArquivo_sequence", initialValue = 1)
    private Long id;

    @NotBlank
    @Size(min = 3, max = 20)
    @Column(name = "NOMEARQUIVO", length = 40)
    private String nome;

    @Column(name = "DESCDIRETORIO", length = 200)
    private String diretorio;

    @Column(name = "DESCOBSERVACAO", length = 255)
    private String observacao;
}

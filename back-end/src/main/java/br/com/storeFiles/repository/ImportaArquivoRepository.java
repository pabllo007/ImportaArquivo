package br.com.storeFiles.repository;

import br.com.storeFiles.model.ImportacaoArquivo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImportaArquivoRepository extends JpaRepository<ImportacaoArquivo, Long> {
   // List<ImportacaoArquivo> findByIdArquivos(Long id);
}

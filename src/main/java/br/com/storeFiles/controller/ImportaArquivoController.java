package br.com.storeFiles.controller;

import br.com.storeFiles.exception.ResourceNotFoundException;
import br.com.storeFiles.model.ImportacaoArquivo;
import br.com.storeFiles.repository.ImportaArquivoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class ImportaArquivoController {

    @Autowired
    private ImportaArquivoRepository importaArquivoRepository;

    @GetMapping("/arquivos")
    public Page<ImportacaoArquivo> getArquivos(Pageable pageable) {
        return importaArquivoRepository.findAll(pageable);
    }

    @PostMapping("/arquivos")
    public ImportacaoArquivo incluir(@Valid @RequestBody ImportacaoArquivo importacaoArquivo) {
        return importaArquivoRepository.save(importacaoArquivo);
    }

    @PutMapping("/arquivos/{id}")
    public ImportacaoArquivo atualizar(@PathVariable Long id,
                                       @Valid @RequestBody ImportacaoArquivo arquivoRequest) {
        return importaArquivoRepository.findById(id)
                .map(arquivo -> {
                    arquivo.setNome(arquivoRequest.getNome());
                    arquivo.setDiretorio(arquivoRequest.getDiretorio());
                    arquivo.setObservacao(arquivoRequest.getObservacao());
                    return importaArquivoRepository.save(arquivo);
                }).orElseThrow(() -> new ResourceNotFoundException("Arquivo não encontrado com o id: " + id ));
    }


    @DeleteMapping("/arquivos/{id}")
    public ResponseEntity<?> excluir(@PathVariable Long id) {
        return importaArquivoRepository.findById(id)
                .map(arquivo -> {
                    importaArquivoRepository.delete(arquivo);
                    return ResponseEntity.ok().build();
                }).orElseThrow(() -> new ResourceNotFoundException("Arquivo não encontrado com o id: " + id ));
    }

}

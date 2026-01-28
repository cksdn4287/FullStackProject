package org.zeroc.backend.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.zeroc.backend.dto.PageRequestDTO;
import org.zeroc.backend.dto.PageResponseDTO;
import org.zeroc.backend.dto.ProductDTO;
import org.zeroc.backend.service.ProductService;
import org.zeroc.backend.util.CustomFileUtil;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;
    private final CustomFileUtil fileUtil;

    @GetMapping("/list")
    public PageResponseDTO<ProductDTO>  list(PageRequestDTO pageRequestDTO){

        log.info("list-----------------------" + pageRequestDTO);

        return  productService.getList(pageRequestDTO);
    }

    @PostMapping("/")
    public Map<String, Long> register(ProductDTO productDTO){
        log.info("register : " + productDTO);

        List<MultipartFile> files = productDTO.getFiles();

        List<String> uploadFileNames = fileUtil.saveFiles(files);

        productDTO.setUploadFileNames(uploadFileNames);

        log.info(uploadFileNames);

        Long pno = productService.register(productDTO);

        return  Map.of("RESULT" , pno);

    }

    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> viewFileGET(@PathVariable String fileName){

        return  fileUtil.getFile(fileName);
    }

    @GetMapping("/{pno}")
    public  ProductDTO read(@PathVariable("pno") Long pno){
        return  productService.get(pno);
    }

    @PutMapping("/{pno}")
    public Map<String, String>  modify(@PathVariable("pno") Long pno, ProductDTO productDTO){

        productDTO.setPno(pno);

        ProductDTO oldProductDTO = productService.get(pno);

        List<String> oldFileNames = oldProductDTO.getUploadFileNames();

        List<MultipartFile> files = productDTO.getFiles();

        List<String> currentUploadFileNames = fileUtil.saveFiles(files);

        List<String> uploadFileNames = productDTO.getUploadFileNames();

        if(currentUploadFileNames != null && currentUploadFileNames.size() > 0) {
            uploadFileNames.addAll(currentUploadFileNames);
        }

        productService.modify(productDTO);

        if(oldFileNames != null && oldFileNames.size() > 0 ){

            List<String> removeFiles = oldFileNames
                    .stream()
                    .filter(fileName -> uploadFileNames.indexOf(fileName) == -1).collect(Collectors.toList());

            fileUtil.deleteFiles(removeFiles);

        }

        return  Map.of("RESULT" , "SECCESS");
    }

    @DeleteMapping("/{pno}")
    public  Map<String, String> remove(@PathVariable("pno") Long pno){

        List<String> oldFileNames = productService.get(pno).getUploadFileNames();

        productService.remove(pno);

        fileUtil.deleteFiles(oldFileNames);

        return Map.of("RESULT", "SUCCESS");
    }
}

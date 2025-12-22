package com.adc.data.controller;

import com.adc.data.service.DataService;
import com.adc.data.viewmodel.ErrorVm;
import com.adc.data.viewmodel.SampleDataVm;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.sql.SQLException;

@RestController
public class SampleDataController {
    private final DataService dataService;

    public SampleDataController(DataService dataService) {
        this.dataService = dataService;
    }

    @PostMapping("/storefront/SampleData")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Created",
                    content = @Content(schema = @Schema(implementation = SampleDataVm.class))),
            @ApiResponse(responseCode = "400", description = "Bad request",
                    content = @Content(schema = @Schema(implementation = ErrorVm.class)))})
    public SampleDataVm createSampleData() throws SQLException, IOException {
        return dataService.createData();
    }
}

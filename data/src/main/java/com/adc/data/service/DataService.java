package com.adc.data.service;

import com.adc.data.utils.SQLExecuteScript;
import com.adc.data.viewmodel.SampleDataVm;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.io.IOException;
import java.sql.SQLException;

@Service
@Transactional
public class DataService {
    private final DataSource dataSourceProduct;
    private final DataSource dataSourceMedia;
    private SQLExecuteScript sqlExecuteScript = new SQLExecuteScript();

    @Value( "${app.sql.product}")
    private String productScripts;

    @Value( "${app.sql.media}")
    private String mediaScripts;

    @Autowired
    public DataService(@Qualifier("dataSourceProduct") DataSource dataSourceProduct,
                       @Qualifier("dataSourceMedia") DataSource dataSourceMedia) {
        this.dataSourceProduct = dataSourceProduct;
        this.dataSourceMedia = dataSourceMedia;
        this.sqlExecuteScript = sqlExecuteScript;
    }

    public SampleDataVm createData() throws SQLException, IOException {
        /*How to get path local and not don't get in file JAR with ENV DEV*/
        sqlExecuteScript.executeScriptForSchema(dataSourceProduct, "public", productScripts);
        sqlExecuteScript.executeScriptForSchema(dataSourceMedia, "public", mediaScripts);
        return new SampleDataVm("Insert Sample Data successfully!", true);
    }
}

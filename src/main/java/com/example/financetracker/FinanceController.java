package com.example.financetracker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
public class FinanceController {

    private final FinanceService financeService;

    @Autowired
    public FinanceController(FinanceService financeService) {
        this.financeService = financeService;
    }



    @PostMapping("/submit")
    public FinanceTable submitFinance(@RequestParam int amount, @RequestParam String description,
                                      @RequestParam String category, @RequestParam String date) {
        // Convert string date to LocalDates
        LocalDate localDate = LocalDate.parse(date);
        return financeService.amountSubmit(amount, description, category, localDate);
    }

    @GetMapping("/all")
    public List<FinanceTable> getAllFinanceEntries() {
        return financeService.getAllFinanceEntries();
    }

    @GetMapping("/entry")
    public Optional<FinanceTable> getFinanceEntryById(@RequestParam int id) {
        return financeService.getFinanceEntryById(id);
    }

    @DeleteMapping("/delete")
    public String deleteFinanceEntryById(@RequestParam int id) {
        financeService.deleteFinanceEntryById(id);
        return "Finance entry with ID " + id + " has been deleted.";
    }
}
//hi
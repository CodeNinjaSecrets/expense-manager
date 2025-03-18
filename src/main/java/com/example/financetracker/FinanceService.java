package com.example.financetracker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class FinanceService {

    private final FinanceRepos financeRepo;

    @Autowired
    public FinanceService(FinanceRepos financeRepo) {
        this.financeRepo = financeRepo;
    }

    // Method to submit a finance record
    public FinanceTable amountSubmit(int amount, String description, String category, LocalDate date) {
        // Create a new FinanceTable object
        FinanceTable financeEntry = new FinanceTable();
        financeEntry.setAmount(amount);
        financeEntry.setDescription(description);
        financeEntry.setCategory(category);
        financeEntry.setDate(date);

        // Save the finance entry to the repository and return the saved entity
        return financeRepo.save(financeEntry);
    }

    // Method to get all finance entries
    public List<FinanceTable> getAllFinanceEntries() {
        return financeRepo.findAll();
    }

    // Method to get a specific finance entry by id
    public Optional<FinanceTable> getFinanceEntryById(int id) {
        return financeRepo.findById(id);
    }

    // Method to delete a finance entry by id
    public void deleteFinanceEntryById(int id) {
        financeRepo.deleteById(id);
    }
}

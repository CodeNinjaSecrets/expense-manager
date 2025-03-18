package com.example.financetracker;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FinanceRepos extends JpaRepository<FinanceTable, Integer> {
}
